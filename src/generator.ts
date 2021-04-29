const spawn = require('cross-spawn')
const fs = require('fs')

export const download_schema = async (filename) => {
    const token = 'YOUR_TOKEN_HERE'
    const command = `get-graphql-schema --json -h "Authorization=Bearer ${ token }" https://api.wayfair.com/v1/graphql > ${ filename }`
    // You must have the following installed for this cli command to execute
    //  npm i -g get-graphql-schema
    // You may have to run the command manually to get something to appear in schema.json
    await run_process([command])
}

const gql_to_ts = (type, schema) => {
    if (typeof type !== 'object') {
        throw Error('oops')
    }

    if (type.kind === 'SCALAR' && type.name === 'String') return 'string'
    if (type.kind === 'SCALAR' && type.name === 'Boolean') return 'boolean'
    if (type.kind === 'SCALAR' && type.name === 'Int') return 'number'
    if (type.kind === 'SCALAR' && type.name === 'PositiveInt') return 'number'
    if (type.kind === 'SCALAR' && type.name === 'Int32') return 'number'
    if (type.kind === 'SCALAR' && type.name === 'Int64') return 'number'
    if (type.kind === 'SCALAR' && type.name === 'IsoDateTime') return 'string'
    if (type.kind === 'SCALAR' && type.name === 'Date_Time') return 'string'
    if (type.kind === 'SCALAR' && type.name === 'Date') return 'string'
    if (type.kind === 'SCALAR' && type.name === 'ID') return 'number'
    if (type.kind === 'SCALAR' && type.name === 'Float') return 'number'
    if (type.kind === 'SCALAR' && type.name === 'NonEmptyString') return 'string'
    if (type.kind === 'SCALAR' && type.name === 'URL') return 'string'

    if (type.kind === 'ENUM') return schema.types.filter(el => el.name === type.name)[0].enumValues.map(el => `'${ el.name }'`).join(' | ')

    if (type.kind === 'OBJECT' || type.kind === 'INPUT_OBJECT' || type.kind === 'INTERFACE') {
        return type.name
    }

    if (type.kind === 'LIST') {
        const list_item_type = type.ofType.ofType || type.ofType

        if (list_item_type.kind === 'SCALAR') return gql_to_ts(list_item_type, schema)
        if (list_item_type.kind === 'OBJECT') return `${ gql_to_ts(list_item_type, schema) }[]`
        if (list_item_type.kind === 'INTERFACE') return `${ gql_to_ts(list_item_type, schema) }[]`
        if (list_item_type.kind === 'ENUM') return `${ gql_to_ts(list_item_type, schema) }[]`

        const input_fields = schema.types.filter(el => el.name === list_item_type.name)[0]?.inputFields
        const new_input_fields = input_fields?.map(input_field => gql_to_ts(input_field.type, schema))
        return `[${ input_fields.map((input_field, i) => `${ input_field.name === 'in' ? "In" : input_field.name === 'package' ? 'Package' : input_field.name }: ${ new_input_fields[i] }`).join(', ') }]`
    }

    if (type.kind === 'NON_NULL') {
        return gql_to_ts(type.ofType, schema)
    }
    throw Error(`unknown type ${ type.kind }`)
}



const camel_to_snake = str => {
    const chars = str.split('')
    let snake_chars = []
    chars.forEach(char => {
        if (char.toUpperCase() === char) {
            snake_chars.push('_')
        }
        snake_chars.push(char.toLowerCase())
    })
    return snake_chars.join('')
}

export const schema_to_class = async (schema_path, class_path) => {
    const schema = (JSON.parse(fs.readFileSync(schema_path, 'utf-8')))['__schema']
    const query_functions = schema.types.filter(el => el.name === 'Query')[0].fields.map(field => {
        const response_type = gql_to_ts(field.type, schema)
        const return_type = schema
            .types
            .filter(el =>
                el.name === field.type.name ||
                el.name === field.type.ofType?.name ||
                el.name === field.type.ofType?.ofType?.name ||
                el.name === field.type.ofType?.ofType?.ofType?.name
            )[0]?.description
        const return_message = response_type[response_type.length - 1] === ']' ? `A list where each element is: ${ return_type }` : return_type
        const fn_name = camel_to_snake(field.name)
        const args = field.args.map(arg => `${ arg.name }?: ${ gql_to_ts(arg.type, schema) }`).join(', ')
        return `
    /**
    * ${ field.description }
    ${ field.args.map(arg => `* @param ${ arg.name } ${ arg.description }`).join('\n\t') } 
    * @returns ${ return_message }
    */
    query_${ fn_name } = async (
        auth: { client_id: string, client_secret: string, base_url: string },        
        query: { __args: {${ args }} } & DeepReplace<${ response_type.slice(-2) == '[]' ? response_type.slice(0, -2) : response_type }>
    ): Promise<{data: { ${ field.name }: ${ response_type }}}> => ax(auth, {query: \`{$\{jsonToGraphQLQuery({ ${ field.name }: query})}}\`})
    `
    })

    const mutation_functions = schema.types
        .filter(el => el.name === 'Mutation')[0]
        .fields
        .map(field => {
            const response_type = gql_to_ts(field.type, schema)
            const return_type = schema
                .types
                .filter(el =>
                    el.name === field.type.name ||
                    el.name === field.type.ofType?.name ||
                    el.name === field.type.ofType?.ofType?.name ||
                    el.name === field.type.ofType?.ofType?.ofType?.name
                )[0]?.description
            const return_message = response_type[response_type.length - 1] === ']' ? `A list where each element is: ${ return_type }` : return_type
            const fn_name = camel_to_snake(field.name)
            const args = field.type
            return `
    /**
    * ${ field.description }
    ${ field.args.map(arg => `* @param ${ arg.name } ${ arg.description }`).join('\n\t') } 
    * @returns ${ return_message }
    */
    mutate_${ fn_name } = async (
        auth: { client_id: string, client_secret: string, base_url: string },
        mutation: {__args: ${ gql_to_ts(args, schema) } } & DeepReplace<${ response_type.slice(-2) == '[]' ? response_type.slice(0, -2) : response_type }>
    ): Promise<${ response_type }> => ax(auth, {mutation: \`{$\{jsonToGraphQLQuery({ ${ field.name }: mutation})}}\`})
    `
        })

    const output =
        `var ax; var jsonToGraphQLQuery;
${ schema.types
            .filter(type => type.name.slice(0, 2) !== '__')
            .filter(type => type.kind === 'OBJECT' || type.kind === 'INPUT_OBJECT' || type.kind === 'INTERFACE')
            .map(type => `type ${ type.name } = { ${ (type.fields || type.inputFields).map(field => `${ field.name }?: ${ gql_to_ts(field.type, schema) }`).join(', ') }}`).join('\n') }
type DeepReplace<T> = {
    [P in keyof T]: T[P] extends object
    ? DeepReplace<T[P]>
    : boolean;
}
class Wayfair {
    ${ query_functions.join('\n\t') }
    ${ mutation_functions.join('\n\t') }
}`
    fs.writeFileSync(class_path, output)
}

const run_process = async (arg_list) => {

    return new Promise((resolve, reject) => {
        // @ts-ignore
        console.log(`Executing: ${ arg_list.join(' ') }`)
        const child_process = spawn(
            arg_list[0]
            , arg_list.slice(1),
            { stdio: 'pipe' }
        )

        let output = []
        let err = []
        child_process.stdout.on('data', (data) => {
            // console.log(data.toString())
            output.push(data.toString())
        });
        child_process.stderr.on('data', (data) => {
            // console.error(data.toString())
            err.push(data.toString())
        });
        child_process.on('close', (code) => {
            if (code !== 0) reject(err)
            resolve(output)
        })

    })
}