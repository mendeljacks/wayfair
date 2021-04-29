declare type Application = {
    clientId?: number;
    clientSecret?: string;
    name?: string;
    description?: string;
    isSandbox?: boolean;
    clientType?: 'EXTRANET' | 'WF' | 'WMS' | 'THIRD_PARTY' | 'ADMIN' | 'TESTING';
    owner?: User;
    permissions?: Permission[];
    scopes?: Scope[];
    suppliers?: Supplier[];
    createdDate?: string;
    onboardingTimelines?: ApplicationOnboardingTimeline[];
    applicationThrottleSettings?: ApplicationThrottleSettings;
};
declare type User = {
    id?: number;
    userType?: 'SUPPLIER' | 'CARRIER' | 'PARTNER' | 'DWELL_STUDIO_WHOLESALE' | 'OFFSHORE' | 'CASTLEGATE' | 'THREE_D_MODELING_CONTRACTOR' | 'DEVELOPER';
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    applications?: Application[];
    roles?: Role[];
    suppliers?: Supplier[];
    profession?: Profession[];
};
declare type Role = {
    id?: number;
    name?: string;
    scopes?: Scope[];
};
declare type Scope = {
    id?: number;
    name?: string;
    permissionName?: string;
    description?: string;
};
declare type Supplier = {
    id?: number;
    name?: string;
    shortName?: string;
    status?: 'ACTIVE' | 'INACTIVE' | 'BEING_ADDED' | 'ON_HOLD';
    websiteURL?: string;
    currency?: 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD';
    scopes?: Scope[];
    warehouses?: Warehouse[];
};
declare type Warehouse = {
    id?: number;
    name?: string;
    address?: Address;
    supplier?: Supplier;
};
declare type Address = {
    name?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    phoneNumber?: string;
};
declare type Profession = {
    id?: number;
    name?: string;
};
declare type Permission = {
    scope?: Scope;
    supplier?: Supplier;
};
declare type ApplicationOnboardingTimeline = {
    integrationType?: 'INVENTORY' | 'ORDER_RESPONSE';
    startDate?: string;
    finishDate?: string;
};
declare type ApplicationThrottleSettings = {
    rateLimit?: number;
    rateSamplingTimeUnit?: 'SECOND' | 'MINUTE' | 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
};
declare type PurchaseOrder = {
    id?: number;
    storePrefix?: string;
    poNumber?: string;
    poDate?: string;
    supplierId?: number;
    supplierName?: string;
    supplierAddress1?: string;
    supplierAddress2?: string;
    supplierAddress3?: string;
    supplierCity?: string;
    supplierState?: string;
    supplierPostalCode?: string;
    estimatedShipDate?: string;
    scheduledDeliveryDate?: string;
    deliveryMethodCode?: string;
    customerName?: string;
    customerAddress1?: string;
    customerAddress2?: string;
    customerCity?: string;
    customerState?: string;
    customerPostalCode?: string;
    customerCountry?: string;
    salesChannelName?: string;
    orderType?: string;
    shippingInfo?: PurchaseOrderShipping;
    packingSlipUrl?: string;
    warehouse?: Warehouse;
    products?: PurchaseOrderProduct[];
    shipTo?: Address;
    billTo?: Address;
    billingInfo?: BillingInfo;
};
declare type PurchaseOrderShipping = {
    shipSpeed?: 'SECOND_DAY_AIR' | 'SECOND_DAY_AIR_FREE' | 'FIVE_DAY_DIRECT' | 'THREE_DAY' | 'CONTAINER' | 'EMAIL' | 'FEDEX_HOME' | 'GROUND' | 'PAKETVERSAND' | 'IMPERIAL_POOL_FREIGHT' | 'NEXT_DAY' | 'NEXT_DAY_OVERSEAS' | 'NEXT_MORNING' | 'NEXT_DAY_BEFORE_NINE' | 'WILL_CALL' | 'SATURDAY_DELIVERY' | 'TRUCK_FREIGHT_CASKETS_ONE_DAY' | 'TRUCK_FREIGHT_CASKETS_TWO_DAY' | 'CURBSIDE_WITH_UNLOAD' | 'TRUCK_LOAD' | 'CURBSIDE' | 'WHITE_GLOVE_BRONZE' | 'WHITE_GLOVE_GOLD' | 'WHITE_GLOVE_TWO_MAN' | 'WHITE_GLOVE_PLATINUM' | 'WHITE_GLOVE_SILVER' | 'TRUCK_FREIGHT_THRESHOLD' | 'STANDARD_VERSAND_SPERRGUT' | 'ALMO' | 'LARGE_PARCEL_COURIER' | 'EUROPEAN_LINE_HAUL' | 'ECONOMY' | 'WHITE_GLOVE_ROOM_OF_CHOICE' | 'TINY_PARCEL' | 'GROUND_OVERSEA' | 'LOW_COST_CARRIER' | 'WHITE_GLOVE_INNOVEL' | 'BACKYARD' | 'CURBSIDE_DELIVERY';
    carrierCode?: string;
    poolPointAgent?: Agent;
    crossDockAgent?: Agent;
    deliveryAgent?: Agent;
};
declare type Agent = {
    id?: number;
    name?: string;
};
declare type PurchaseOrderProduct = {
    partNumber?: string;
    quantity?: string;
    price?: number;
    pieceCount?: number;
    totalCost?: number;
    name?: string;
    weight?: number;
    totalWeight?: number;
    estShipDate?: string;
    fillDate?: string;
    sku?: string;
    isCancelled?: boolean;
    isTscaCompliant?: boolean;
    twoDayGuaranteeDeliveryDeadline?: string;
    event?: SalesEvent;
    customComment?: string;
};
declare type SalesEvent = {
    id?: number;
    type?: string;
    name?: string;
    startDate?: string;
    endDate?: string;
};
declare type BillingInfo = {
    vatNumber?: string;
};
declare type WarehouseShippingAdvice = {
    wsaId?: string;
    supplierId?: number;
    poNumber?: string;
    fulfillmentCustomerOrderNumber?: string;
    fulfillmentCustomerId?: number;
    retailerOrderNumber?: string;
    fulfillmentPurchaseOrderNumber?: string;
    creationDate?: string;
    shipDate?: string;
    shipSpeed?: string;
    carrierCode?: string;
    totalShipmentWeight?: number;
    totalQuantity?: number;
    clientNumber?: string;
    warehouseId?: number;
    actionDate?: string;
    transactionHandle?: string;
    packages?: WarehouseShippingAdvicePackageType[];
    shipFrom?: WarehouseShippingAdviceAddress;
    shipTo?: WarehouseShippingAdviceAddress;
    products?: WarehouseShippingAdviceProduct[];
};
declare type WarehouseShippingAdvicePackageType = {
    packageWeight?: number;
    trackingNumber?: string;
};
declare type WarehouseShippingAdviceAddress = {
    name?: string;
    title?: string;
    company?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    phoneNumber?: string;
};
declare type WarehouseShippingAdviceProduct = {
    quantityOrdered?: number;
    partNumber?: string;
    name?: string;
    quantityShipped?: number;
    upc?: string;
    sku?: string;
    forceQuantityMultiplier?: number;
};
declare type InboundStockPurchaseOrderStat = {
    id?: number;
    suId?: number;
    stockPurchaseOrderId?: string;
    containerNumber?: string;
    status?: 'COMPLETED' | 'IN_TRANSIT' | 'BOOKED' | 'SUBMITTED';
    serviceLevel?: 'NGS' | 'NVO' | 'DRA' | 'NRV' | 'BCO' | 'ACN' | 'ACI' | 'OND';
    originPort?: Facility;
    destinationPort?: Facility;
    deliveryWarehouse?: Facility;
    totalUnits?: number;
    totalWholesale?: number;
    latestDrayMilestone?: Milestone;
    latestOceanMilestone?: Milestone;
    completedDate?: string;
};
declare type Facility = {
    id?: number;
    name?: string;
    unlocode?: string;
    isActive?: boolean;
    types?: 'WAREHOUSE' | 'FACTORY' | 'FACTORY_HIDDEN_FROM_EXTRANET' | 'CONTAINER_FREIGHT_STATION' | 'PORT' | 'RAIL_TERMINAL' | 'ROAD_TERMINAL' | 'AIRPORT' | 'POSTAL_EXCHANGE_OFFICE' | 'MULTIMODAL' | 'FIXED_TRANSPORT' | 'BORDER_CROSSING' | 'PORT_TERMINAL' | 'THIRD_PARTY_DESTINATION'[];
    company?: FacilityCompany;
    address?: FacilityAddress;
    facilityTag?: Tag[];
    geoLocation?: GeoLocation;
    contact?: FacilityContact;
    companyId?: number;
    unlocodeName?: string;
    factory?: Factory;
    timezone?: string;
    isVerifiedOriginFactory?: boolean;
};
declare type FacilityCompany = {
    id?: number;
    supplierId?: number;
    name?: string;
    isActive?: boolean;
    address?: FacilityAddress;
    addresses?: CompanyAddress[];
    geoLocation?: GeoLocation;
    companyType?: 'SUPPLIER' | 'CFS_VENDOR' | 'CARRIER';
    contacts?: CompanyContact[];
    trustedFactoryPortPairs?: TrustedFactoryPort[];
    tags?: Tag[];
};
declare type FacilityAddress = {
    id?: number;
    name?: string;
    address1?: string;
    address2?: string;
    city?: string;
    province?: string;
    country?: string;
    cy2Code?: string;
    cy3Code?: string;
    zipCode?: string;
    isValidated?: boolean;
    systemVerificationScore?: number;
    systemVerificationTime?: string;
};
declare type CompanyAddress = {
    address?: FacilityAddress;
    geolocation?: GeoLocation;
    addressType?: 'Accounts_Payable_Mailing_Address' | 'Accounts_Receivable_Mailing_Address' | 'Customs_Address_Of_Record' | 'Miscellaneous_Address' | 'Office_Address' | 'Pickup_And_Delivery_Address_For_Consignments';
};
declare type GeoLocation = {
    id?: number;
    latitude?: string;
    longitude?: string;
    isValidated?: boolean;
    insertTime?: string;
    updateTime?: string;
};
declare type CompanyContact = {
    contactType?: 'PRIMARY';
    contact?: Contact;
};
declare type Contact = {
    id?: number;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    emailAddress?: string;
};
declare type TrustedFactoryPort = {
    originFacility?: Facility;
    originPort?: Facility;
};
declare type Tag = {
    id?: number;
    tagSource?: string;
    tagKey?: string;
    tagValue?: string;
    insertTime?: string;
    updateTime?: string;
};
declare type FacilityContact = {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    emailAddress?: string;
    isActive?: boolean;
    isPrimary?: boolean;
};
declare type Factory = {
    facId?: number;
    orderLeadTimeDays?: number;
    insertTime?: string;
    updateTime?: string;
};
declare type Milestone = {
    id?: number;
    direction?: 'ARRIVAL' | 'DEPARTURE';
    transportMode?: 'Sea' | 'Rail' | 'Road' | 'Unknown';
    facility?: Facility;
    milestoneTime?: string;
};
declare type Inventory = {
    supplierPartNumber?: string;
    product?: WayfairProduct;
    quantityOnHand?: number;
    quantityBackordered?: number;
    quantityOnOrder?: number;
    discontinued?: boolean;
    itemNextAvailabilityDate?: string;
    warehouse?: Warehouse;
};
declare type WayfairProduct = {
    sku?: string;
    name?: string;
    url?: string;
    imageUrl?: string;
    averageOverallRating?: number;
    minimumOrderQuantity?: number;
    setQuantity?: number;
    displaySetQuantity?: number;
    status?: string;
    statusDetail?: string;
    harmonizedSystemCode?: string;
    canadaCode?: string;
    minimumHeight?: Dimension;
    maximumHeight?: Dimension;
    minimumWidth?: Dimension;
    maximumWidth?: Dimension;
    minimumDepth?: Dimension;
    maximumDepth?: Dimension;
    class?: ProductClass;
    manufacturer?: Manufacturer;
    collection?: ProductCollection;
    options?: ProductOption[];
    variations?: ProductVariation[];
    returnPolicy?: string;
};
declare type Dimension = {
    amount?: number;
    unit?: 'INCHES' | 'CENTIMETERS';
};
declare type ProductClass = {
    id?: number;
    name?: string;
    categoryId?: number;
    categoryName?: string;
    options?: ProductClassOption[];
    attributes?: ProductClassAttribute[];
};
declare type ProductClassOption = {
    categoryName?: string;
    rank?: string;
};
declare type ProductClassAttribute = {
    id?: number;
    name?: string;
    parentId?: number;
    priority?: string;
    dataType?: string;
    definition?: string;
    displayRank?: number;
    unavailable?: number;
    doesNotApply?: number;
    enumValues?: string;
};
declare type Manufacturer = {
    id?: number;
    name?: string;
    address?: Address;
    hasWhitelabeling?: boolean;
};
declare type ProductCollection = {
    id?: number;
    name?: string;
    description?: string;
    products?: WayfairProduct[];
};
declare type ProductOption = {
    id?: number;
    category?: string;
    name?: string;
};
declare type ProductVariation = {
    url?: string;
    imageUrl?: string;
    displayDimensions?: string;
    optionCombination?: ProductOption[];
    product?: WayfairProduct;
    parts?: Part[];
};
declare type Part = {
    upc?: string;
    supplierPartNumber?: string;
    manufacturerModelNumber?: string;
    leadTime?: number;
    replacementPartLeadTime?: number;
    mapPrice?: Money;
    retailPrice?: Money;
    products?: ProductVariation[];
    supplier?: Supplier;
    manufacturer?: Manufacturer;
    manufacturerPartId?: number;
};
declare type Money = {
    amount?: number;
    currency?: 'US_DOLLAR' | 'BRITISH_POUND' | 'EURO' | 'CANADIAN_DOLLAR' | 'AUSTRALIAN_DOLLAR';
};
declare type LabelGenerationEvent = {
    id?: number;
    eventDate?: string;
    pickupDate?: string;
    poNumber?: number;
    billOfLading?: BillOfLading;
    consolidatedShippingLabel?: ShippingLabel;
    customsDocument?: CustomsDocument;
    generatedShippingLabels?: ShippingLabelInfo[];
    shippingLabelInfo?: ShippingLabelInterface[];
    purchaseOrder?: PurchaseOrder;
    shippingUnits?: ShippingUnit[];
};
declare type BillOfLading = {
    url?: string;
};
declare type ShippingLabel = {
    url?: string;
};
declare type CustomsDocument = {
    required?: boolean;
    url?: string;
};
declare type ShippingLabelInfo = {
    poNumber?: number;
    fullPoNumber?: string;
    numberOfLabels?: number;
    carrier?: string;
    carrierCode?: string;
    trackingNumber?: string;
};
declare type ShippingLabelInterface = {
    carrier?: string;
    carrierCode?: string;
    trackingNumber?: string;
};
declare type ShippingUnit = {
    groupIdentifier?: number;
    sequenceIdentifier?: number;
    part?: Part;
};
declare type OrderCancellation = {
    id?: number;
    originalOrder?: PurchaseOrder;
    dateCreated?: string;
    parts?: OrderPartCancellation[];
};
declare type OrderPartCancellation = {
    partNumber?: string;
    unitPrice?: number;
    originalQuantity?: number;
    cancelledQuantity?: number;
    remainingQuantity?: number;
};
declare type Product = {
    supplierPartNumber?: string;
    manufacturerModelNumber?: string;
    manufacturerName?: string;
    upc?: string;
    supplierId?: number;
    productName?: string;
    collectionName?: string;
    wholesalePrice?: number;
    mapPrice?: number;
    fullRetailPrice?: number;
    minimumOrderQuantity?: number;
    forceMultiples?: boolean;
    displaySetQuantity?: number;
    manufacturerCountry?: string;
    harmonizedCode?: string;
    canadaCode?: string;
    leadTime?: number;
    leadTimeForReplacementParts?: number;
    sku?: string;
    skuStatus?: string;
    skuSubstatus?: string;
    whiteLabeled?: boolean;
    wayfairClass?: string;
    options?: ProductOption[];
    shippingInfo?: ProductShipping;
};
declare type ProductShipping = {
    shipSpeed?: ShippingSpeed;
    weight?: Weight;
    cartons?: ProductShippingCarton[];
};
declare type ShippingSpeed = {
    id?: number;
    name?: string;
};
declare type Weight = {
    amount?: number;
    unit?: 'POUNDS' | 'KILOGRAMS';
};
declare type ProductShippingCarton = {
    height?: Dimension;
    width?: Dimension;
    depth?: Dimension;
    weight?: Weight;
};
declare type PurchaseOrderErrorConnection = {
    purchaseOrder?: PurchaseOrder;
    errors?: PurchaseOrderError[];
    purchaseOrderProductErrorsConnection?: PurchaseOrderProductErrorConnection[];
};
declare type PurchaseOrderError = {
    field?: 'PURCHASE_ORDER_ID' | 'PURCHASE_ORDER_NUMBER' | 'PURCHASE_ORDER_NUMBER_SEND' | 'MUST_SHIP_BY_DATE' | 'SUPPLIER_EMAIL' | 'SUPPLIER_PHONE' | 'SHIP_TO_STATE' | 'SHIP_TO_POSTAL_CODE' | 'SHIP_TO_ADDRESS_ONE' | 'SHIP_TO_ADDRESS_TWO' | 'SHIP_TO_NAME' | 'SHIP_TO_CITY' | 'SHIP_TO_COUNTRY' | 'CUSTOMER_STATE' | 'CUSTOMER_POSTAL_CODE' | 'CUSTOMER_ADDRESS_ONE' | 'CUSTOMER_ADDRESS_TWO' | 'CUSTOMER_NAME' | 'CUSTOMER_CITY' | 'CUSTOMER_COUNTRY';
    message?: 'MISSING_DATA' | 'ILLEGAL_CHARACTER_LENGTH' | 'DUPLICATE_PURCHASE_ORDER';
};
declare type PurchaseOrderProductErrorConnection = {
    purchaseOrderProduct?: PurchaseOrderProduct;
    errors?: PurchaseOrderProductError[];
};
declare type PurchaseOrderProductError = {
    field?: 'PRODUCT_ID' | 'PRODUCT_PART_NUMBER';
    message?: 'MISSING_DATA' | 'ILLEGAL_CHARACTER_LENGTH';
};
declare type TransactionStatus = {
    id?: string;
    handle?: string;
    status?: 'NEW' | 'PROCESSING' | 'ERROR' | 'COMPLETE';
    submitted_at?: string;
    submittedAt?: string;
    completed_at?: string;
    completedAt?: string;
    itemCount?: number;
    errorCount?: number;
    errors?: ItemStatus[];
    completedCount?: number;
    completed?: ItemStatus[];
    processingCount?: number;
    processing?: ItemStatus[];
};
declare type ItemStatus = {
    key?: string;
    message?: string;
};
declare type UPSPickupEvent = {
    pickupReference?: number;
    dateOfPickup?: string;
    warehouseId?: number;
};
declare type SupplierVetting = {
    inventoryRuns?: InventoryVettingRun[];
    purchaseOrderTimelines?: PurchaseOrderTimelineConnection[];
};
declare type InventoryVettingRun = {
    application?: Application;
    supplier?: Supplier;
    apiFeed?: InventoryFeed;
    otherFeed?: InventoryFeed;
    partVariance?: InventoryPartVariance[];
    averageVariance?: number;
    matchedRowsCount?: number;
    totalRowsCount?: number;
    matchedRowsWithVarianceCount?: number;
};
declare type InventoryFeed = {
    id?: number;
    dateSubmitted?: string;
};
declare type InventoryPartVariance = {
    partNumber?: number;
    apiQuantity?: number;
    otherQuantity?: number;
    quantityVariance?: number;
    apiQuantityPercentIncrease?: number;
};
declare type PurchaseOrderTimelineConnection = {
    purchaseOrder?: PurchaseOrder;
    partResponseTimelines?: PurchaseOrderPartTimelineConnection[];
    fulfillmentChannel?: 'ALL' | 'CASTLEGATE' | 'DROPSHIP';
};
declare type PurchaseOrderPartTimelineConnection = {
    partNumber?: string;
    quantity?: number;
    actionTaken?: 'RETRIEVED' | 'ACCEPTED' | 'BACKORDERED' | 'REJECTED' | 'SHIPPED' | 'ACKNOWLEDGE_CASTLEGATE' | 'ACKNOWLEDGE_CASTLEGATE_WSA';
    date?: string;
};
declare type ApplicationMutator = {
    create?: Application;
    update?: Application;
    delete?: Application;
    rotateSecret?: Application;
    authorize?: Application;
    deauthorize?: Application;
};
declare type CatalogProjectMutator = {
    save?: CatalogProject;
};
declare type CatalogProject = {
    id?: number;
    name?: string;
    status?: 'NOT_SUBMITTED' | 'IN_REVIEW' | 'ON_HOLD' | 'COMPLETE_PRODUCT_ATTRIBUTES_NEEDED' | 'COMPLETE_LIVE' | 'CANCELLED';
    createdTimestamp?: string;
    submittedTimestamp?: string;
    processedTimestamp?: string;
    supplier?: Supplier;
    manufacturers?: Manufacturer[];
    products?: ProjectProduct[];
};
declare type ProjectProduct = {
    supplierPartNumber?: string;
    manufacturerPartNumber?: string;
    name?: string;
    countryOfOrigin?: 'UNITED_STATES' | 'CANADA' | 'AFGHANISTAN' | 'ALAND_ISLANDS' | 'ALBANIA' | 'ALGERIA' | 'AMERICAN_SAMOA' | 'ANDORRA' | 'ANGOLA' | 'ANGUILLA' | 'ANTARCTICA' | 'ANTIGUA_AND_BARBUDA' | 'ARGENTINA' | 'ARMENIA' | 'ARUBA' | 'AUSTRALIA' | 'AUSTRIA' | 'AZERBAIJAN' | 'BAHAMAS' | 'BAHRAIN' | 'BANGLADESH' | 'BARBADOS' | 'BELARUS' | 'BELGIUM' | 'BELIZE' | 'BENIN' | 'BERMUDA' | 'BHUTAN' | 'BOLIVIA' | 'BOSNIA_AND_HERZEGOVINA' | 'BOTSWANA' | 'BOUVET_ISLAND' | 'BRAZIL' | 'BRITISH_INDIAN_OCEAN_TERRITORY' | 'BRUNEI_DARUSSALAM' | 'BULGARIA' | 'BURKINA_FASO' | 'BURUNDI' | 'CAMBODIA' | 'CAMEROON' | 'CAPE_VERDE' | 'CAYMAN_ISLANDS' | 'CENTRAL_AFRICAN_REPUBLIC' | 'CHAD' | 'CHILE' | 'CHINA' | 'CHRISTMAS_ISLAND' | 'KEELING_ISLANDS' | 'COCOS_ISLANDS' | 'COLOMBIA' | 'COMOROS' | 'CONGO' | 'THE_DEMOCRATIC_REPUBLIC_OF_THE_CONGO' | 'COOK_ISLANDS' | 'COSTA_RICA' | 'COTE_DIVOIRE' | 'CROATIA' | 'CUBA' | 'CYPRUS' | 'CZECH_REPUBLIC' | 'DENMARK' | 'DJIBOUTI' | 'DOMINICA' | 'DOMINICAN_REPUBLIC' | 'ECUADOR' | 'EGYPT' | 'EL_SALVADOR' | 'EQUATORIAL_GUINEA' | 'ERITREA' | 'ESTONIA' | 'ETHIOPIA' | 'MALVINAS' | 'FALKLAND_ISLANDS' | 'FAROE_ISLANDS' | 'FIJI' | 'FINLAND' | 'FRANCE' | 'FRENCH_GUIANA' | 'FRENCH_POLYNESIA' | 'FRENCH_SOUTHERN_TERRITORIES' | 'GABON' | 'GAMBIA' | 'GEORGIA' | 'GERMANY' | 'GHANA' | 'GIBRALTAR' | 'GREECE' | 'GREENLAND' | 'GRENADA' | 'GUADELOUPE' | 'GUAM' | 'GUATEMALA' | 'GUERNSEY' | 'GUINEA' | 'GUINEA_BISSAU' | 'GUYANA' | 'HAITI' | 'HEARD_ISLAND_AND_MCDONALD_ISLANDS' | 'HOLY_SEE' | 'VATICAN_CITY_STATE' | 'HONDURAS' | 'HONG_KONG' | 'HUNGARY' | 'ICELAND' | 'INDIA' | 'INDONESIA' | 'IRAN' | 'IRAQ' | 'IRELAND' | 'ISLE_OF_MAN' | 'ISRAEL' | 'ITALY' | 'JAMAICA' | 'JAPAN' | 'JERSEY' | 'JORDAN' | 'KAZAKHSTAN' | 'KENYA' | 'KIRIBATI' | 'DEMOCRATIC_PEOPLES_REPUBLIC_OF_KOREA' | 'REPUBLIC_OF_KOREA' | 'KUWAIT' | 'KYRGYZSTAN' | 'LAO_PEOPLES_DEMOCRATIC_REPUBLIC' | 'LATVIA' | 'LEBANON' | 'LESOTHO' | 'LIBERIA' | 'LIBYAN_ARAB_JAMAHIRIYA' | 'LIECHTENSTEIN' | 'LITHUANIA' | 'LUXEMBOURG' | 'MACAO' | 'THE_FORMER_YUGOSLAV_REPUBLIC_OF_MACEDONIA' | 'MADAGASCAR' | 'MALAWI' | 'MALAYSIA' | 'MALDIVES' | 'MALI' | 'MALTA' | 'MARSHALL_ISLANDS' | 'MARTINIQUE' | 'MAURITANIA' | 'MAURITIUS' | 'MAYOTTE' | 'MEXICO' | 'FEDERATED_STATES_OF_MICRONESIA' | 'REPUBLIC_OF_MOLDOVA' | 'MONACO' | 'MONGOLIA' | 'MONTENEGRO' | 'MONTSERRAT' | 'MOROCCO' | 'MOZAMBIQUE' | 'MYANMAR' | 'NAMIBIA' | 'NAURU' | 'NEPAL' | 'NETHERLANDS' | 'NETHERLANDS_ANTILLES' | 'NEW_CALEDONIA' | 'NEW_ZEALAND' | 'NICARAGUA' | 'NIGER' | 'NIGERIA' | 'NIUE' | 'NORFOLK_ISLAND' | 'NORTHERN_MARIANA_ISLANDS' | 'NORWAY' | 'OMAN' | 'PAKISTAN' | 'PALAU' | 'OCCUPIED_PALESTINIAN_TERRITORY' | 'PANAMA' | 'PAPUA_NEW_GUINEA' | 'PARAGUAY' | 'PERU' | 'PHILIPPINES' | 'PITCAIRN' | 'POLAND' | 'PORTUGAL' | 'PUERTO_RICO' | 'QATAR' | 'REUNION' | 'ROMANIA' | 'RUSSIAN_FEDERATION' | 'RWANDA' | 'SAINT_BARTHELEMY' | 'SAINT_HELENA' | 'SAINT_KITTS_AND_NEVIS' | 'SAINT_LUCIA' | 'SAINT_MARTIN' | 'SAINT_PIERRE_AND_MIQUELON' | 'SAINT_VINCENT_AND_THE_GRENADINES' | 'SAMOA' | 'SAN_MARINO' | 'SAO_TOME_AND_PRINCIPE' | 'SAUDI_ARABIA' | 'SENEGAL' | 'SERBIA' | 'SEYCHELLES' | 'SIERRA_LEONE' | 'SINGAPORE' | 'SLOVAKIA' | 'SLOVENIA' | 'SOLOMON_ISLANDS' | 'SOMALIA' | 'SOUTH_AFRICA' | 'SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS' | 'SPAIN' | 'SRI_LANKA' | 'SUDAN' | 'SURINAME' | 'SVALBARD_AND_JAN_MAYEN' | 'SWAZILAND' | 'SWEDEN' | 'SWITZERLAND' | 'SYRIAN_ARAB_REPUBLIC' | 'TAIWAN' | 'TAJIKISTAN' | 'UNITED_REPUBLIC_OF_TANZANIA' | 'THAILAND' | 'TIMOR_LESTE' | 'TOGO' | 'TOKELAU' | 'TONGA' | 'TRINIDAD_AND_TOBAGO' | 'TUNISIA' | 'TURKEY' | 'TURKMENISTAN' | 'TURKS_AND_CAICOS_ISLANDS' | 'TUVALU' | 'UGANDA' | 'UKRAINE' | 'UNITED_ARAB_EMIRATES' | 'UNITED_KINGDOM' | 'UNITED_STATES_MINOR_OUTLYING_ISLANDS' | 'URUGUAY' | 'UZBEKISTAN' | 'VANUATU' | 'VENEZUELA' | 'VIET_NAM' | 'BRITISH_VIRGIN_ISLANDS' | 'US_VIRGIN_ISLANDS' | 'WALLIS_AND_FUTUNA' | 'WESTERN_SAHARA' | 'YEMEN' | 'ZAMBIA' | 'ZIMBABWE';
    shipVia?: 'SMALL_PARCEL' | 'TRUCK_FREIGHT' | 'WHITE_GLOVE_BRONZE' | 'WHITE_GLOVE_SILVER' | 'WHITE_GLOVE_GOLD' | 'WHITE_GLOVE_PLATINUM' | 'WHITE_GLOVE_BRONZE_MATTRESS' | 'WHITE_GLOVE_SILVER_MATTRESS' | 'WHITE_GLOVE_GOLD_MATTRESS' | 'WHITE_GLOVE_PLATINUM_MATTRESS' | 'THRESHOLD_TO_ROOM' | 'WHITE_GLOVE_TO_THRESHOLD' | 'WHITE_GLOVE_TO_ROOM' | 'EMAIL_DELIVERY_US' | 'EMAIL_DELIVERY_UK' | 'EMAIL_DELIVERY_DE';
    length?: Dimension;
    width?: Dimension;
    height?: Dimension;
    weight?: Weight;
    manufacturer?: Manufacturer;
    category?: ProductCategory;
    validationErrors?: CatalogValidationError[];
};
declare type ProductCategory = {
    id?: number;
    name?: string;
};
declare type CatalogValidationError = {
    errorLevel?: 'WARNING' | 'ERROR';
    errorCode?: 'SC0001' | 'SC0002' | 'SC0003' | 'SC0004' | 'SC0005' | 'SC0006' | 'SC0007' | 'SC0008' | 'SC0009' | 'SC0010' | 'SC0011' | 'SC0012' | 'SC0013' | 'SC0014' | 'SC0015' | 'SC0016' | 'SC0017' | 'SC0018' | 'SC0019' | 'SC0020' | 'SC0021' | 'SC0022' | 'SC0023' | 'SC0024' | 'SC0025' | 'SC0026' | 'SC0027' | 'SC0028' | 'SC0029' | 'SC0030' | 'SC0031' | 'CM0001';
    message?: string;
    fieldName?: string;
};
declare type InventoryMutator = {
    save?: TransactionStatus;
};
declare type PurchaseOrderMutator = {
    acknowledge?: TransactionStatus;
    backorder?: TransactionStatus;
    accept?: TransactionStatus;
    reject?: TransactionStatus;
    shipment?: TransactionStatus;
    delivery?: TransactionStatus;
    requestForPickup?: TransactionStatus;
    register?: LabelGenerationEvent;
    generateManifest?: ManifestGenerationEvent;
    acknowledgeCastleGate?: TransactionStatus;
    acknowledgeCastleGateWarehouseShippingAdvice?: TransactionStatus;
};
declare type ManifestGenerationEvent = {
    manifestDocument?: ManifestDocument;
};
declare type ManifestDocument = {
    url?: string;
};
declare type DeepReplace<T> = {
    [P in keyof T]: T[P] extends object ? DeepReplace<T[P]> : boolean;
};
declare class Wayfair {
    /**
    * Loads the API applications.
    * @param filters A list of filters to apply.
    * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
    * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
    * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
    * @returns A list where each element is: A single Wayfair API application.
    */
    query_applications: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, query: {
        __args: {
            filters?: [field: 'clientId' | 'clientSecret' | 'name' | 'description' | 'isSandbox' | 'clientType' | 'createdDate', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean];
            ordering?: [asc: string, desc: string];
            limit?: number;
            offset?: number;
        };
    } & DeepReplace<Application>) => Promise<{
        data: {
            applications: Application[];
        };
    }>;
    /**
    * Retrieves CastleGate purchase orders.
    * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
    * @param hasResponse The Purchase Order open status. Whether the purchase order is open.
    * @param fromDate The Purchase Order starting date period. Specifies the starting date from which to grab purchase orders.
    * @param poNumbers The list of Purchase Order numbers to return.
    * @param sortOrder Order the result set by ascending or descending order of poDate.
    * @returns A list where each element is: A purchase order.
    */
    query_get_castle_gate_purchase_orders: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, query: {
        __args: {
            limit?: number;
            hasResponse?: boolean;
            fromDate?: string;
            poNumbers?: string;
            sortOrder?: 'ASC' | 'DESC';
        };
    } & DeepReplace<PurchaseOrder>) => Promise<{
        data: {
            getCastleGatePurchaseOrders: PurchaseOrder[];
        };
    }>;
    /**
    * Loads CastleGate warehouse shipping advice.
    * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
    * @param hasResponse Return only open or only acknowledged Warehouse Shipping Advices
    * @param fromDate The Warehouse Shipping Advice starting date period. Specifies the starting date from which to grab Warehouse Shipping Advices
    * @param wsaIds List of Castlegate WSA Id's for which to return associated Warehouse Shipping Advices.
    * @param sortOrder Order the result set by ascending or descending order of creationDate.
    * @returns A list where each element is: A warehouse shipping advice
    */
    query_get_castle_gate_warehouse_shipping_advice: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, query: {
        __args: {
            limit?: number;
            hasResponse?: boolean;
            fromDate?: string;
            wsaIds?: string;
            sortOrder?: 'ASC' | 'DESC';
        };
    } & DeepReplace<WarehouseShippingAdvice>) => Promise<{
        data: {
            getCastleGateWarehouseShippingAdvice: WarehouseShippingAdvice[];
        };
    }>;
    /**
    * Retrieves Dropship purchase orders.
    * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
    * @param hasResponse The Purchase Order open status. Whether the purchase order is open.
    * @param fromDate The Purchase Order starting date period. Specifies the starting date from which to grab purchase orders.
    * @param poNumbers The list of Purchase Order numbers to return.
    * @param sortOrder Order the result set by ascending or descending order of poDate.
    * @returns A list where each element is: A purchase order.
    */
    query_get_dropship_purchase_orders: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, query: {
        __args: {
            limit?: number;
            hasResponse?: boolean;
            fromDate?: string;
            poNumbers?: string;
            sortOrder?: 'ASC' | 'DESC';
        };
    } & DeepReplace<PurchaseOrder>) => Promise<{
        data: {
            getDropshipPurchaseOrders: PurchaseOrder[];
        };
    }>;
    /**
    * Fetches the current, authenticated Extranet user.
     
    * @returns A single Wayfair API user.
    */
    query_identity: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, query: {
        __args: {};
    } & DeepReplace<User>) => Promise<{
        data: {
            identity: User;
        };
    }>;
    /**
    * Loads information about inbound stock purchase order stats.
    * @param filters A list of filters to apply.
    * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
    * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
    * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
    * @returns A list where each element is: Stats for Inbound Stock Purchase Orders
    */
    query_inbound_stock_purchase_order_stats: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, query: {
        __args: {
            filters?: [field: 'id' | 'suId' | 'stockPurchaseOrderId' | 'containerNumber' | 'status' | 'serviceLevel' | 'totalUnits' | 'totalWholesale' | 'completedDate', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean];
            ordering?: [asc: string, desc: string];
            limit?: number;
            offset?: number;
        };
    } & DeepReplace<InboundStockPurchaseOrderStat>) => Promise<{
        data: {
            inboundStockPurchaseOrderStats: InboundStockPurchaseOrderStat[];
        };
    }>;
    /**
    * Retrieves inventory data.
    * @param filters A list of filters to apply.
    * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
    * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
    * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
    * @returns A list where each element is: Fetches inventory data for the supplier/suppliers.
    */
    query_inventory: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, query: {
        __args: {
            filters?: [field: 'supplierPartNumber' | 'quantityOnHand' | 'quantityBackordered' | 'quantityOnOrder' | 'discontinued' | 'itemNextAvailabilityDate' | 'warehouseId', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean];
            ordering?: [asc: string, desc: string];
            limit?: number;
            offset?: number;
        };
    } & DeepReplace<Inventory>) => Promise<{
        data: {
            inventory: Inventory[];
        };
    }>;
    /**
    * Load label generation events that occurred through the API
    * @param filters A list of filters to apply.
    * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
    * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
    * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
    * @returns A list where each element is: This type includes all the information that resulted from the generation of labels for a purchase order.
    */
    query_label_generation_events: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, query: {
        __args: {
            filters?: [field: 'id' | 'eventDate' | 'pickupDate' | 'poNumber', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean];
            ordering?: [asc: string, desc: string];
            limit?: number;
            offset?: number;
        };
    } & DeepReplace<LabelGenerationEvent>) => Promise<{
        data: {
            labelGenerationEvents: LabelGenerationEvent[];
        };
    }>;
    /**
    * Fetches data for a Wayfair-initiated order cancellation.
    * @param filters A list of filters to apply.
    * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
    * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
    * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
    * @returns A list where each element is: Represents an order cancellation.
    */
    query_order_cancellations: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, query: {
        __args: {
            filters?: [field: 'id' | 'dateCreated', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean];
            ordering?: [asc: string, desc: string];
            limit?: number;
            offset?: number;
        };
    } & DeepReplace<OrderCancellation>) => Promise<{
        data: {
            orderCancellations: OrderCancellation[];
        };
    }>;
    /**
    * Load a catalog of products and their catalog information.
    * @param filters A list of filters to apply.
    * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
    * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
    * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
    * @returns A list where each element is: Information about a product that a specific supplier has provided.
    */
    query_parts: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, query: {
        __args: {
            filters?: [field: 'upc' | 'supplierPartNumber' | 'manufacturerModelNumber' | 'leadTime' | 'replacementPartLeadTime' | 'manufacturerPartId', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean];
            ordering?: [asc: string, desc: string];
            limit?: number;
            offset?: number;
        };
    } & DeepReplace<Part>) => Promise<{
        data: {
            parts: Part[];
        };
    }>;
    /**
    *
Fetches catalog data for the supplier/suppliers.

Example:
query catalog {
  catalog(
    ordering: [{
      desc: "lead_time"
    }],
    limit: 3,
    offset: 3
  ) {
    supplier_id,
    supplier_part_number,
    manufacturer_model_number,
    manufacturer_name,
    product_name
  }
}
    * @param filters A list of filters to apply.
    * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
    * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
    * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
    * @returns A list where each element is: This type contains all the necessary information about an item in a catalog.
    */
    query_product_catalogs: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, query: {
        __args: {
            filters?: [field: 'supplierPartNumber' | 'manufacturerModelNumber' | 'manufacturerName' | 'upc' | 'supplierId' | 'productName' | 'collectionName' | 'wholesalePrice' | 'mapPrice' | 'fullRetailPrice' | 'minimumOrderQuantity' | 'forceMultiples' | 'displaySetQuantity' | 'manufacturerCountry' | 'harmonizedCode' | 'canadaCode' | 'leadTime' | 'leadTimeForReplacementParts' | 'sku' | 'skuStatus' | 'skuSubstatus' | 'whiteLabeled' | 'wayfairClass', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean];
            ordering?: [asc: string, desc: string];
            limit?: number;
            offset?: number;
        };
    } & DeepReplace<Product>) => Promise<{
        data: {
            productCatalogs: Product[];
        };
    }>;
    /**
    * Retrieves inventory data.
    * @param filters A list of filters to apply.
    * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
    * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
    * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
    * @returns A list where each element is: Fetches inventory data for the supplier/suppliers.
    */
    query_product_inventory: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, query: {
        __args: {
            filters?: [field: 'supplierPartNumber' | 'quantityOnHand' | 'quantityBackordered' | 'quantityOnOrder' | 'discontinued' | 'itemNextAvailabilityDate' | 'warehouseId', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean];
            ordering?: [asc: string, desc: string];
            limit?: number;
            offset?: number;
        };
    } & DeepReplace<Inventory>) => Promise<{
        data: {
            productInventory: Inventory[];
        };
    }>;
    /**
    * Retrieves purchase order errors.
    * @param filters A list of filters to apply.
    * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
    * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
    * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
    * @returns A list where each element is: Error information related to purchase orders
    */
    query_purchase_order_errors: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, query: {
        __args: {
            filters?: [field: 'supplierId' | 'poNumber', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean];
            ordering?: [asc: string, desc: string];
            limit?: number;
            offset?: number;
        };
    } & DeepReplace<PurchaseOrderErrorConnection>) => Promise<{
        data: {
            purchaseOrderErrors: PurchaseOrderErrorConnection[];
        };
    }>;
    /**
    * Retrieves purchase orders.
    * @param filters A list of filters to apply.
    * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
    * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
    * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
    * @param dryRun Whether to query test purchase order data, or production purchase order data. Results of any dryRun purchase order mutations will only be exposed if this argument is true.
    * @returns A list where each element is: A purchase order.
    */
    query_purchase_orders: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, query: {
        __args: {
            filters?: [field: 'id' | 'storePrefix' | 'poNumber' | 'poDate' | 'supplierId' | 'supplierName' | 'supplierAddress1' | 'supplierAddress2' | 'supplierAddress3' | 'supplierCity' | 'supplierState' | 'supplierPostalCode' | 'estimatedShipDate' | 'scheduledDeliveryDate' | 'deliveryMethodCode' | 'customerName' | 'customerAddress1' | 'customerAddress2' | 'customerCity' | 'customerState' | 'customerPostalCode' | 'customerCountry' | 'salesChannelName' | 'orderType' | 'packingSlipUrl' | 'open' | 'partNumber', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean];
            ordering?: [asc: string, desc: string];
            limit?: number;
            offset?: number;
            dryRun?: boolean;
        };
    } & DeepReplace<PurchaseOrder>) => Promise<{
        data: {
            purchaseOrders: PurchaseOrder[];
        };
    }>;
    /**
    * Retrieves transaction information for long-running processes.
    * @param filters A list of filters to apply.
    * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
    * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
    * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
    * @returns A list where each element is: The status of a transaction made
    */
    query_transactions: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, query: {
        __args: {
            filters?: [field: 'id' | 'handle' | 'status' | 'submitted_at' | 'submittedAt' | 'completed_at' | 'completedAt' | 'itemCount' | 'errorCount' | 'completedCount' | 'processingCount', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean];
            ordering?: [asc: string, desc: string];
            limit?: number;
            offset?: number;
        };
    } & DeepReplace<TransactionStatus>) => Promise<{
        data: {
            transactions: TransactionStatus[];
        };
    }>;
    /**
    * Shows upcoming scheduled UPS pickups.
    * @param filters A list of filters to apply.
    * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
    * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
    * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
    * @returns A list where each element is: Represents a scheduled UPS pickup event
    */
    query_ups_pickup_events: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, query: {
        __args: {
            filters?: [field: 'pickupReference' | 'dateOfPickup' | 'warehouseId', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean];
            ordering?: [asc: string, desc: string];
            limit?: number;
            offset?: number;
        };
    } & DeepReplace<UPSPickupEvent>) => Promise<{
        data: {
            upsPickupEvents: UPSPickupEvent[];
        };
    }>;
    /**
    * Retrieves Extranet users.
    * @param filters A list of filters to apply.
    * @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
    * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
    * @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
    * @returns A list where each element is: A single Wayfair API user.
    */
    query_users: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, query: {
        __args: {
            filters?: [field: 'id' | 'userType' | 'username' | 'firstName' | 'lastName' | 'email', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean];
            ordering?: [asc: string, desc: string];
            limit?: number;
            offset?: number;
        };
    } & DeepReplace<User>) => Promise<{
        data: {
            users: User[];
        };
    }>;
    /**
    * Retrieves an instance of the SupplierVetting namespace.
     
    * @returns Querying Namespace object capable of running queries for supplier vetting.
    */
    query_workflow_vetting: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, query: {
        __args: {};
    } & DeepReplace<SupplierVetting>) => Promise<{
        data: {
            workflowVetting: SupplierVetting;
        };
    }>;
    /**
    * Retrieves an instance of ApplicationMutator with which to run application mutations.
     
    * @returns Mutator object capable of running mutations on applications.
    */
    mutate_applications: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, mutation: {
        __args: ApplicationMutator;
    } & DeepReplace<ApplicationMutator>) => Promise<ApplicationMutator>;
    /**
    * The Type containing all the mutations for catalog projects.
     
    * @returns Mutator object capable of running mutations on catalog projects.
    */
    mutate_catalog_projects: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, mutation: {
        __args: CatalogProjectMutator;
    } & DeepReplace<CatalogProjectMutator>) => Promise<CatalogProjectMutator>;
    /**
    * The Type containing all mutations for inventory.

Click into a mutation below to see an example of the that mutation.
     
    * @returns Mutator object capable of running mutations on inventory.
    */
    mutate_inventory: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, mutation: {
        __args: InventoryMutator;
    } & DeepReplace<InventoryMutator>) => Promise<InventoryMutator>;
    /**
    * The Type containing all mutations for inventory.

Click into a mutation below to see an example of the that mutation.
     
    * @returns Mutator object capable of running mutations on inventory.
    */
    mutate_product_inventory: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, mutation: {
        __args: InventoryMutator;
    } & DeepReplace<InventoryMutator>) => Promise<InventoryMutator>;
    /**
    * Retrieves an instance of PurchaseOrderMutator to run purchase order mutations with.
     
    * @returns Mutator object capable of running mutations on purchase orders.

NOTE: Purchase order mutations are under active development and should be considered as an Alpha release.
    */
    mutate_purchase_orders: (auth: {
        client_id: string;
        client_secret: string;
        base_url: string;
    }, mutation: {
        __args: PurchaseOrderMutator;
    } & DeepReplace<PurchaseOrderMutator>) => Promise<PurchaseOrderMutator>;
}
export declare const wayfair: Wayfair;
export {};
