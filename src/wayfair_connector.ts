import axios from 'axios'
import { jsonToGraphQLQuery } from 'json-to-graphql-query';

let token = ''
const ax = async (auth, body): Promise<any> => {
	if (!token) {
		const login_response: any = await axios.post(`https://sso.auth.wayfair.com/oauth/token`, {
			grant_type: 'client_credentials',
			client_id: auth.client_id,
			client_secret: auth.client_secret,
		})
			.catch(err => {
				debugger
			})
		token = login_response.data.access_token
	}

	const response = await axios.post(auth.base_url, body, {
		headers: {
			Authorization: `Bearer ${ token }`
		}
	})


	return response.data
}
type Query = { applications?: Application[], getCastleGatePurchaseOrders?: PurchaseOrder[], getCastleGateWarehouseShippingAdvice?: WarehouseShippingAdvice[], getDropshipPurchaseOrders?: PurchaseOrder[], identity?: User, inboundStockPurchaseOrderStats?: InboundStockPurchaseOrderStat[], inventory?: Inventory[], labelGenerationEvents?: LabelGenerationEvent[], orderCancellations?: OrderCancellation[], parts?: Part[], productCatalogs?: Product[], productInventory?: Inventory[], purchaseOrderErrors?: PurchaseOrderErrorConnection[], purchaseOrders?: PurchaseOrder[], transactions?: TransactionStatus[], upsPickupEvents?: UPSPickupEvent[], users?: User[], workflowVetting?: SupplierVetting}
type ApplicationFilterInput = { field?: 'clientId' | 'clientSecret' | 'name' | 'description' | 'isSandbox' | 'clientType' | 'createdDate', conjunction?: 'AND' | 'OR', equals?: string, greaterThan?: string, greaterThanOrEqualTo?: string, lessThan?: string, lessThanOrEqualTo?: string, notEqualTo?: string, in?: string, notIn?: string, isNull?: boolean, greater_than?: string, greater_than_or_equal_to?: string, less_than?: string, less_than_or_equal_to?: string, not_equal_to?: string, not_in?: string, is_null?: boolean}
type orderingInput = { asc?: string, desc?: string}
type Application = { clientId?: number, clientSecret?: string, name?: string, description?: string, isSandbox?: boolean, clientType?: 'EXTRANET' | 'WF' | 'WMS' | 'THIRD_PARTY' | 'ADMIN' | 'TESTING', owner?: User, permissions?: Permission[], scopes?: Scope[], suppliers?: Supplier[], createdDate?: string, onboardingTimelines?: ApplicationOnboardingTimeline[], applicationThrottleSettings?: ApplicationThrottleSettings}
type User = { id?: number, userType?: 'SUPPLIER' | 'CARRIER' | 'PARTNER' | 'DWELL_STUDIO_WHOLESALE' | 'OFFSHORE' | 'CASTLEGATE' | 'THREE_D_MODELING_CONTRACTOR' | 'DEVELOPER', username?: string, firstName?: string, lastName?: string, email?: string, applications?: Application[], roles?: Role[], suppliers?: Supplier[], profession?: Profession[]}
type Role = { id?: number, name?: string, scopes?: Scope[]}
type Scope = { id?: number, name?: string, permissionName?: string, description?: string}
type Supplier = { id?: number, name?: string, shortName?: string, status?: 'ACTIVE' | 'INACTIVE' | 'BEING_ADDED' | 'ON_HOLD', websiteURL?: string, currency?: 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD', scopes?: Scope[], warehouses?: Warehouse[]}
type Warehouse = { id?: number, name?: string, address?: Address, supplier?: Supplier}
type Address = { name?: string, address1?: string, address2?: string, address3?: string, city?: string, state?: string, country?: string, postalCode?: string, phoneNumber?: string}
type Profession = { id?: number, name?: string}
type Permission = { scope?: Scope, supplier?: Supplier}
type ApplicationOnboardingTimeline = { integrationType?: 'INVENTORY' | 'ORDER_RESPONSE', startDate?: string, finishDate?: string}
type ApplicationThrottleSettings = { rateLimit?: number, rateSamplingTimeUnit?: 'SECOND' | 'MINUTE' | 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'}
type PurchaseOrder = { id?: number, storePrefix?: string, poNumber?: string, poDate?: string, supplierId?: number, supplierName?: string, supplierAddress1?: string, supplierAddress2?: string, supplierAddress3?: string, supplierCity?: string, supplierState?: string, supplierPostalCode?: string, estimatedShipDate?: string, scheduledDeliveryDate?: string, deliveryMethodCode?: string, customerName?: string, customerAddress1?: string, customerAddress2?: string, customerCity?: string, customerState?: string, customerPostalCode?: string, customerCountry?: string, salesChannelName?: string, orderType?: string, shippingInfo?: PurchaseOrderShipping, packingSlipUrl?: string, warehouse?: Warehouse, products?: PurchaseOrderProduct[], shipTo?: Address, billTo?: Address, billingInfo?: BillingInfo}
type PurchaseOrderShipping = { shipSpeed?: 'SECOND_DAY_AIR' | 'SECOND_DAY_AIR_FREE' | 'FIVE_DAY_DIRECT' | 'THREE_DAY' | 'CONTAINER' | 'EMAIL' | 'FEDEX_HOME' | 'GROUND' | 'PAKETVERSAND' | 'IMPERIAL_POOL_FREIGHT' | 'NEXT_DAY' | 'NEXT_DAY_OVERSEAS' | 'NEXT_MORNING' | 'NEXT_DAY_BEFORE_NINE' | 'WILL_CALL' | 'SATURDAY_DELIVERY' | 'TRUCK_FREIGHT_CASKETS_ONE_DAY' | 'TRUCK_FREIGHT_CASKETS_TWO_DAY' | 'CURBSIDE_WITH_UNLOAD' | 'TRUCK_LOAD' | 'CURBSIDE' | 'WHITE_GLOVE_BRONZE' | 'WHITE_GLOVE_GOLD' | 'WHITE_GLOVE_TWO_MAN' | 'WHITE_GLOVE_PLATINUM' | 'WHITE_GLOVE_SILVER' | 'TRUCK_FREIGHT_THRESHOLD' | 'STANDARD_VERSAND_SPERRGUT' | 'ALMO' | 'LARGE_PARCEL_COURIER' | 'EUROPEAN_LINE_HAUL' | 'ECONOMY' | 'WHITE_GLOVE_ROOM_OF_CHOICE' | 'TINY_PARCEL' | 'GROUND_OVERSEA' | 'LOW_COST_CARRIER' | 'WHITE_GLOVE_INNOVEL' | 'BACKYARD' | 'CURBSIDE_DELIVERY', carrierCode?: string, poolPointAgent?: Agent, crossDockAgent?: Agent, deliveryAgent?: Agent}
type Agent = { id?: number, name?: string}
type PurchaseOrderProduct = { partNumber?: string, quantity?: string, price?: number, pieceCount?: number, totalCost?: number, name?: string, weight?: number, totalWeight?: number, estShipDate?: string, fillDate?: string, sku?: string, isCancelled?: boolean, isTscaCompliant?: boolean, twoDayGuaranteeDeliveryDeadline?: string, event?: SalesEvent, customComment?: string}
type SalesEvent = { id?: number, type?: string, name?: string, startDate?: string, endDate?: string}
type BillingInfo = { vatNumber?: string}
type WarehouseShippingAdvice = { wsaId?: string, supplierId?: number, poNumber?: string, fulfillmentCustomerOrderNumber?: string, fulfillmentCustomerId?: number, retailerOrderNumber?: string, fulfillmentPurchaseOrderNumber?: string, creationDate?: string, shipDate?: string, shipSpeed?: string, carrierCode?: string, totalShipmentWeight?: number, totalQuantity?: number, clientNumber?: string, warehouseId?: number, actionDate?: string, transactionHandle?: string, packages?: WarehouseShippingAdvicePackageType[], shipFrom?: WarehouseShippingAdviceAddress, shipTo?: WarehouseShippingAdviceAddress, products?: WarehouseShippingAdviceProduct[]}
type WarehouseShippingAdvicePackageType = { packageWeight?: number, trackingNumber?: string}
type WarehouseShippingAdviceAddress = { name?: string, title?: string, company?: string, address1?: string, address2?: string, address3?: string, city?: string, state?: string, country?: string, postalCode?: string, phoneNumber?: string}
type WarehouseShippingAdviceProduct = { quantityOrdered?: number, partNumber?: string, name?: string, quantityShipped?: number, upc?: string, sku?: string, forceQuantityMultiplier?: number}
type InboundStockPurchaseOrderStatFilterInput = { field?: 'id' | 'suId' | 'stockPurchaseOrderId' | 'containerNumber' | 'status' | 'serviceLevel' | 'totalUnits' | 'totalWholesale' | 'completedDate', conjunction?: 'AND' | 'OR', equals?: string, greaterThan?: string, greaterThanOrEqualTo?: string, lessThan?: string, lessThanOrEqualTo?: string, notEqualTo?: string, in?: string, notIn?: string, isNull?: boolean, greater_than?: string, greater_than_or_equal_to?: string, less_than?: string, less_than_or_equal_to?: string, not_equal_to?: string, not_in?: string, is_null?: boolean}
type InboundStockPurchaseOrderStat = { id?: number, suId?: number, stockPurchaseOrderId?: string, containerNumber?: string, status?: 'COMPLETED' | 'IN_TRANSIT' | 'BOOKED' | 'SUBMITTED', serviceLevel?: 'NGS' | 'NVO' | 'DRA' | 'NRV' | 'BCO' | 'ACN' | 'ACI' | 'OND', originPort?: Facility, destinationPort?: Facility, deliveryWarehouse?: Facility, totalUnits?: number, totalWholesale?: number, latestDrayMilestone?: Milestone, latestOceanMilestone?: Milestone, completedDate?: string}
type Facility = { id?: number, name?: string, unlocode?: string, isActive?: boolean, types?: 'WAREHOUSE' | 'FACTORY' | 'FACTORY_HIDDEN_FROM_EXTRANET' | 'CONTAINER_FREIGHT_STATION' | 'PORT' | 'RAIL_TERMINAL' | 'ROAD_TERMINAL' | 'AIRPORT' | 'POSTAL_EXCHANGE_OFFICE' | 'MULTIMODAL' | 'FIXED_TRANSPORT' | 'BORDER_CROSSING' | 'PORT_TERMINAL' | 'THIRD_PARTY_DESTINATION'[], company?: FacilityCompany, address?: FacilityAddress, facilityTag?: Tag[], geoLocation?: GeoLocation, contact?: FacilityContact, companyId?: number, unlocodeName?: string, factory?: Factory, timezone?: string, isVerifiedOriginFactory?: boolean}
type FacilityCompany = { id?: number, supplierId?: number, name?: string, isActive?: boolean, address?: FacilityAddress, addresses?: CompanyAddress[], geoLocation?: GeoLocation, companyType?: 'SUPPLIER' | 'CFS_VENDOR' | 'CARRIER', contacts?: CompanyContact[], trustedFactoryPortPairs?: TrustedFactoryPort[], tags?: Tag[]}
type FacilityAddress = { id?: number, name?: string, address1?: string, address2?: string, city?: string, province?: string, country?: string, cy2Code?: string, cy3Code?: string, zipCode?: string, isValidated?: boolean, systemVerificationScore?: number, systemVerificationTime?: string}
type CompanyAddress = { address?: FacilityAddress, geolocation?: GeoLocation, addressType?: 'Accounts_Payable_Mailing_Address' | 'Accounts_Receivable_Mailing_Address' | 'Customs_Address_Of_Record' | 'Miscellaneous_Address' | 'Office_Address' | 'Pickup_And_Delivery_Address_For_Consignments'}
type GeoLocation = { id?: number, latitude?: string, longitude?: string, isValidated?: boolean, insertTime?: string, updateTime?: string}
type CompanyContact = { contactType?: 'PRIMARY', contact?: Contact}
type Contact = { id?: number, firstName?: string, lastName?: string, phoneNumber?: string, emailAddress?: string}
type TrustedFactoryPort = { originFacility?: Facility, originPort?: Facility}
type Tag = { id?: number, tagSource?: string, tagKey?: string, tagValue?: string, insertTime?: string, updateTime?: string}
type FacilityContact = { firstName?: string, lastName?: string, phoneNumber?: string, emailAddress?: string, isActive?: boolean, isPrimary?: boolean}
type Factory = { facId?: number, orderLeadTimeDays?: number, insertTime?: string, updateTime?: string}
type Milestone = { id?: number, direction?: 'ARRIVAL' | 'DEPARTURE', transportMode?: 'Sea' | 'Rail' | 'Road' | 'Unknown', facility?: Facility, milestoneTime?: string}
type InventoryFilterInput = { field?: 'supplierPartNumber' | 'quantityOnHand' | 'quantityBackordered' | 'quantityOnOrder' | 'discontinued' | 'itemNextAvailabilityDate' | 'warehouseId', conjunction?: 'AND' | 'OR', equals?: string, greaterThan?: string, greaterThanOrEqualTo?: string, lessThan?: string, lessThanOrEqualTo?: string, notEqualTo?: string, in?: string, notIn?: string, isNull?: boolean, greater_than?: string, greater_than_or_equal_to?: string, less_than?: string, less_than_or_equal_to?: string, not_equal_to?: string, not_in?: string, is_null?: boolean}
type Inventory = { supplierPartNumber?: string, product?: WayfairProduct, quantityOnHand?: number, quantityBackordered?: number, quantityOnOrder?: number, discontinued?: boolean, itemNextAvailabilityDate?: string, warehouse?: Warehouse}
type WayfairProduct = { sku?: string, name?: string, url?: string, imageUrl?: string, averageOverallRating?: number, minimumOrderQuantity?: number, setQuantity?: number, displaySetQuantity?: number, status?: string, statusDetail?: string, harmonizedSystemCode?: string, canadaCode?: string, minimumHeight?: Dimension, maximumHeight?: Dimension, minimumWidth?: Dimension, maximumWidth?: Dimension, minimumDepth?: Dimension, maximumDepth?: Dimension, class?: ProductClass, manufacturer?: Manufacturer, collection?: ProductCollection, options?: ProductOption[], variations?: ProductVariation[], returnPolicy?: string}
type ImageSizeInput = { height?: number, weight?: number, width?: number}
type Dimension = { amount?: number, unit?: 'INCHES' | 'CENTIMETERS'}
type ProductClass = { id?: number, name?: string, categoryId?: number, categoryName?: string, options?: ProductClassOption[], attributes?: ProductClassAttribute[]}
type ProductClassOption = { categoryName?: string, rank?: string}
type ProductClassAttribute = { id?: number, name?: string, parentId?: number, priority?: string, dataType?: string, definition?: string, displayRank?: number, unavailable?: number, doesNotApply?: number, enumValues?: string}
type Manufacturer = { id?: number, name?: string, address?: Address, hasWhitelabeling?: boolean}
type ProductCollection = { id?: number, name?: string, description?: string, products?: WayfairProduct[]}
type ProductOption = { id?: number, category?: string, name?: string}
type ProductVariation = { url?: string, imageUrl?: string, displayDimensions?: string, optionCombination?: ProductOption[], product?: WayfairProduct, parts?: Part[]}
type Part = { upc?: string, supplierPartNumber?: string, manufacturerModelNumber?: string, leadTime?: number, replacementPartLeadTime?: number, mapPrice?: Money, retailPrice?: Money, products?: ProductVariation[], supplier?: Supplier, manufacturer?: Manufacturer, manufacturerPartId?: number}
type Money = { amount?: number, currency?: 'US_DOLLAR' | 'BRITISH_POUND' | 'EURO' | 'CANADIAN_DOLLAR' | 'AUSTRALIAN_DOLLAR'}
type LabelGenerationEventFilterInput = { field?: 'id' | 'eventDate' | 'pickupDate' | 'poNumber', conjunction?: 'AND' | 'OR', equals?: string, greaterThan?: string, greaterThanOrEqualTo?: string, lessThan?: string, lessThanOrEqualTo?: string, notEqualTo?: string, in?: string, notIn?: string, isNull?: boolean, greater_than?: string, greater_than_or_equal_to?: string, less_than?: string, less_than_or_equal_to?: string, not_equal_to?: string, not_in?: string, is_null?: boolean}
type LabelGenerationEvent = { id?: number, eventDate?: string, pickupDate?: string, poNumber?: number, billOfLading?: BillOfLading, consolidatedShippingLabel?: ShippingLabel, customsDocument?: CustomsDocument, generatedShippingLabels?: ShippingLabelInfo[], shippingLabelInfo?: ShippingLabelInterface[], purchaseOrder?: PurchaseOrder, shippingUnits?: ShippingUnit[]}
type BillOfLading = { url?: string}
type ShippingLabel = { url?: string}
type CustomsDocument = { required?: boolean, url?: string}
type ShippingLabelInfo = { poNumber?: number, fullPoNumber?: string, numberOfLabels?: number, carrier?: string, carrierCode?: string, trackingNumber?: string}
type ShippingLabelInterface = { carrier?: string, carrierCode?: string, trackingNumber?: string}
type ShippingUnit = { groupIdentifier?: number, sequenceIdentifier?: number, part?: Part}
type OrderCancellationFilterInput = { field?: 'id' | 'dateCreated', conjunction?: 'AND' | 'OR', equals?: string, greaterThan?: string, greaterThanOrEqualTo?: string, lessThan?: string, lessThanOrEqualTo?: string, notEqualTo?: string, in?: string, notIn?: string, isNull?: boolean, greater_than?: string, greater_than_or_equal_to?: string, less_than?: string, less_than_or_equal_to?: string, not_equal_to?: string, not_in?: string, is_null?: boolean}
type OrderCancellation = { id?: number, originalOrder?: PurchaseOrder, dateCreated?: string, parts?: OrderPartCancellation[]}
type OrderPartCancellation = { partNumber?: string, unitPrice?: number, originalQuantity?: number, cancelledQuantity?: number, remainingQuantity?: number}
type PartFilterInput = { field?: 'upc' | 'supplierPartNumber' | 'manufacturerModelNumber' | 'leadTime' | 'replacementPartLeadTime' | 'manufacturerPartId', conjunction?: 'AND' | 'OR', equals?: string, greaterThan?: string, greaterThanOrEqualTo?: string, lessThan?: string, lessThanOrEqualTo?: string, notEqualTo?: string, in?: string, notIn?: string, isNull?: boolean, greater_than?: string, greater_than_or_equal_to?: string, less_than?: string, less_than_or_equal_to?: string, not_equal_to?: string, not_in?: string, is_null?: boolean}
type ProductFilterInput = { field?: 'supplierPartNumber' | 'manufacturerModelNumber' | 'manufacturerName' | 'upc' | 'supplierId' | 'productName' | 'collectionName' | 'wholesalePrice' | 'mapPrice' | 'fullRetailPrice' | 'minimumOrderQuantity' | 'forceMultiples' | 'displaySetQuantity' | 'manufacturerCountry' | 'harmonizedCode' | 'canadaCode' | 'leadTime' | 'leadTimeForReplacementParts' | 'sku' | 'skuStatus' | 'skuSubstatus' | 'whiteLabeled' | 'wayfairClass', conjunction?: 'AND' | 'OR', equals?: string, greaterThan?: string, greaterThanOrEqualTo?: string, lessThan?: string, lessThanOrEqualTo?: string, notEqualTo?: string, in?: string, notIn?: string, isNull?: boolean, greater_than?: string, greater_than_or_equal_to?: string, less_than?: string, less_than_or_equal_to?: string, not_equal_to?: string, not_in?: string, is_null?: boolean}
type Product = { supplierPartNumber?: string, manufacturerModelNumber?: string, manufacturerName?: string, upc?: string, supplierId?: number, productName?: string, collectionName?: string, wholesalePrice?: number, mapPrice?: number, fullRetailPrice?: number, minimumOrderQuantity?: number, forceMultiples?: boolean, displaySetQuantity?: number, manufacturerCountry?: string, harmonizedCode?: string, canadaCode?: string, leadTime?: number, leadTimeForReplacementParts?: number, sku?: string, skuStatus?: string, skuSubstatus?: string, whiteLabeled?: boolean, wayfairClass?: string, options?: ProductOption[], shippingInfo?: ProductShipping}
type ProductShipping = { shipSpeed?: ShippingSpeed, weight?: Weight, cartons?: ProductShippingCarton[]}
type ShippingSpeed = { id?: number, name?: string}
type Weight = { amount?: number, unit?: 'POUNDS' | 'KILOGRAMS'}
type ProductShippingCarton = { height?: Dimension, width?: Dimension, depth?: Dimension, weight?: Weight}
type PurchaseOrderErrorConnectionFilterInput = { field?: 'supplierId' | 'poNumber', conjunction?: 'AND' | 'OR', equals?: string, greaterThan?: string, greaterThanOrEqualTo?: string, lessThan?: string, lessThanOrEqualTo?: string, notEqualTo?: string, in?: string, notIn?: string, isNull?: boolean, greater_than?: string, greater_than_or_equal_to?: string, less_than?: string, less_than_or_equal_to?: string, not_equal_to?: string, not_in?: string, is_null?: boolean}
type PurchaseOrderErrorConnection = { purchaseOrder?: PurchaseOrder, errors?: PurchaseOrderError[], purchaseOrderProductErrorsConnection?: PurchaseOrderProductErrorConnection[]}
type PurchaseOrderError = { field?: 'PURCHASE_ORDER_ID' | 'PURCHASE_ORDER_NUMBER' | 'PURCHASE_ORDER_NUMBER_SEND' | 'MUST_SHIP_BY_DATE' | 'SUPPLIER_EMAIL' | 'SUPPLIER_PHONE' | 'SHIP_TO_STATE' | 'SHIP_TO_POSTAL_CODE' | 'SHIP_TO_ADDRESS_ONE' | 'SHIP_TO_ADDRESS_TWO' | 'SHIP_TO_NAME' | 'SHIP_TO_CITY' | 'SHIP_TO_COUNTRY' | 'CUSTOMER_STATE' | 'CUSTOMER_POSTAL_CODE' | 'CUSTOMER_ADDRESS_ONE' | 'CUSTOMER_ADDRESS_TWO' | 'CUSTOMER_NAME' | 'CUSTOMER_CITY' | 'CUSTOMER_COUNTRY', message?: 'MISSING_DATA' | 'ILLEGAL_CHARACTER_LENGTH' | 'DUPLICATE_PURCHASE_ORDER'}
type PurchaseOrderProductErrorConnection = { purchaseOrderProduct?: PurchaseOrderProduct, errors?: PurchaseOrderProductError[]}
type PurchaseOrderProductError = { field?: 'PRODUCT_ID' | 'PRODUCT_PART_NUMBER', message?: 'MISSING_DATA' | 'ILLEGAL_CHARACTER_LENGTH'}
type PurchaseOrderFilterInput = { field?: 'id' | 'storePrefix' | 'poNumber' | 'poDate' | 'supplierId' | 'supplierName' | 'supplierAddress1' | 'supplierAddress2' | 'supplierAddress3' | 'supplierCity' | 'supplierState' | 'supplierPostalCode' | 'estimatedShipDate' | 'scheduledDeliveryDate' | 'deliveryMethodCode' | 'customerName' | 'customerAddress1' | 'customerAddress2' | 'customerCity' | 'customerState' | 'customerPostalCode' | 'customerCountry' | 'salesChannelName' | 'orderType' | 'packingSlipUrl' | 'open' | 'partNumber', conjunction?: 'AND' | 'OR', equals?: string, greaterThan?: string, greaterThanOrEqualTo?: string, lessThan?: string, lessThanOrEqualTo?: string, notEqualTo?: string, in?: string, notIn?: string, isNull?: boolean, greater_than?: string, greater_than_or_equal_to?: string, less_than?: string, less_than_or_equal_to?: string, not_equal_to?: string, not_in?: string, is_null?: boolean}
type TransactionStatusFilterInput = { field?: 'id' | 'handle' | 'status' | 'submitted_at' | 'submittedAt' | 'completed_at' | 'completedAt' | 'itemCount' | 'errorCount' | 'completedCount' | 'processingCount', conjunction?: 'AND' | 'OR', equals?: string, greaterThan?: string, greaterThanOrEqualTo?: string, lessThan?: string, lessThanOrEqualTo?: string, notEqualTo?: string, in?: string, notIn?: string, isNull?: boolean, greater_than?: string, greater_than_or_equal_to?: string, less_than?: string, less_than_or_equal_to?: string, not_equal_to?: string, not_in?: string, is_null?: boolean}
type TransactionStatus = { id?: string, handle?: string, status?: 'NEW' | 'PROCESSING' | 'ERROR' | 'COMPLETE', submitted_at?: string, submittedAt?: string, completed_at?: string, completedAt?: string, itemCount?: number, errorCount?: number, errors?: ItemStatus[], completedCount?: number, completed?: ItemStatus[], processingCount?: number, processing?: ItemStatus[]}
type ItemStatus = { key?: string, message?: string}
type UPSPickupEventFilterInput = { field?: 'pickupReference' | 'dateOfPickup' | 'warehouseId', conjunction?: 'AND' | 'OR', equals?: string, greaterThan?: string, greaterThanOrEqualTo?: string, lessThan?: string, lessThanOrEqualTo?: string, notEqualTo?: string, in?: string, notIn?: string, isNull?: boolean, greater_than?: string, greater_than_or_equal_to?: string, less_than?: string, less_than_or_equal_to?: string, not_equal_to?: string, not_in?: string, is_null?: boolean}
type UPSPickupEvent = { pickupReference?: number, dateOfPickup?: string, warehouseId?: number}
type UserFilterInput = { field?: 'id' | 'userType' | 'username' | 'firstName' | 'lastName' | 'email', conjunction?: 'AND' | 'OR', equals?: string, greaterThan?: string, greaterThanOrEqualTo?: string, lessThan?: string, lessThanOrEqualTo?: string, notEqualTo?: string, in?: string, notIn?: string, isNull?: boolean, greater_than?: string, greater_than_or_equal_to?: string, less_than?: string, less_than_or_equal_to?: string, not_equal_to?: string, not_in?: string, is_null?: boolean}
type SupplierVetting = { inventoryRuns?: InventoryVettingRun[], purchaseOrderTimelines?: PurchaseOrderTimelineConnection[]}
type InventoryVettingRunFilterInput = { field?: 'averageVariance' | 'matchedRowsCount' | 'totalRowsCount' | 'matchedRowsWithVarianceCount' | 'supplierId' | 'apiFeedId' | 'clientId', conjunction?: 'AND' | 'OR', equals?: string, greaterThan?: string, greaterThanOrEqualTo?: string, lessThan?: string, lessThanOrEqualTo?: string, notEqualTo?: string, in?: string, notIn?: string, isNull?: boolean, greater_than?: string, greater_than_or_equal_to?: string, less_than?: string, less_than_or_equal_to?: string, not_equal_to?: string, not_in?: string, is_null?: boolean}
type InventoryVettingRun = { application?: Application, supplier?: Supplier, apiFeed?: InventoryFeed, otherFeed?: InventoryFeed, partVariance?: InventoryPartVariance[], averageVariance?: number, matchedRowsCount?: number, totalRowsCount?: number, matchedRowsWithVarianceCount?: number}
type InventoryFeed = { id?: number, dateSubmitted?: string}
type InventoryPartVariance = { partNumber?: number, apiQuantity?: number, otherQuantity?: number, quantityVariance?: number, apiQuantityPercentIncrease?: number}
type PurchaseOrderTimelineConnection = { purchaseOrder?: PurchaseOrder, partResponseTimelines?: PurchaseOrderPartTimelineConnection[], fulfillmentChannel?: 'ALL' | 'CASTLEGATE' | 'DROPSHIP'}
type PurchaseOrderPartTimelineConnection = { partNumber?: string, quantity?: number, actionTaken?: 'RETRIEVED' | 'ACCEPTED' | 'BACKORDERED' | 'REJECTED' | 'SHIPPED' | 'ACKNOWLEDGE_CASTLEGATE' | 'ACKNOWLEDGE_CASTLEGATE_WSA', date?: string}
type Mutation = { applications?: ApplicationMutator, catalogProjects?: CatalogProjectMutator, inventory?: InventoryMutator, productInventory?: InventoryMutator, purchaseOrders?: PurchaseOrderMutator}
type ApplicationMutator = { create?: Application, update?: Application, delete?: Application, rotateSecret?: Application, authorize?: Application, deauthorize?: Application}
type ApplicationInput = { clientId?: string, name?: string, description?: string, applicationThrottleSettings?: ApplicationThrottleSettingsInput}
type ApplicationThrottleSettingsInput = { rateLimit?: number, rateSamplingTimeUnit?: 'SECOND' | 'MINUTE' | 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'}
type CatalogProjectMutator = { save?: CatalogProject}
type ProductInput = { partNumber?: string, countryOfOrigin?: 'UNITED_STATES' | 'CANADA' | 'AFGHANISTAN' | 'ALAND_ISLANDS' | 'ALBANIA' | 'ALGERIA' | 'AMERICAN_SAMOA' | 'ANDORRA' | 'ANGOLA' | 'ANGUILLA' | 'ANTARCTICA' | 'ANTIGUA_AND_BARBUDA' | 'ARGENTINA' | 'ARMENIA' | 'ARUBA' | 'AUSTRALIA' | 'AUSTRIA' | 'AZERBAIJAN' | 'BAHAMAS' | 'BAHRAIN' | 'BANGLADESH' | 'BARBADOS' | 'BELARUS' | 'BELGIUM' | 'BELIZE' | 'BENIN' | 'BERMUDA' | 'BHUTAN' | 'BOLIVIA' | 'BOSNIA_AND_HERZEGOVINA' | 'BOTSWANA' | 'BOUVET_ISLAND' | 'BRAZIL' | 'BRITISH_INDIAN_OCEAN_TERRITORY' | 'BRUNEI_DARUSSALAM' | 'BULGARIA' | 'BURKINA_FASO' | 'BURUNDI' | 'CAMBODIA' | 'CAMEROON' | 'CAPE_VERDE' | 'CAYMAN_ISLANDS' | 'CENTRAL_AFRICAN_REPUBLIC' | 'CHAD' | 'CHILE' | 'CHINA' | 'CHRISTMAS_ISLAND' | 'KEELING_ISLANDS' | 'COCOS_ISLANDS' | 'COLOMBIA' | 'COMOROS' | 'CONGO' | 'THE_DEMOCRATIC_REPUBLIC_OF_THE_CONGO' | 'COOK_ISLANDS' | 'COSTA_RICA' | 'COTE_DIVOIRE' | 'CROATIA' | 'CUBA' | 'CYPRUS' | 'CZECH_REPUBLIC' | 'DENMARK' | 'DJIBOUTI' | 'DOMINICA' | 'DOMINICAN_REPUBLIC' | 'ECUADOR' | 'EGYPT' | 'EL_SALVADOR' | 'EQUATORIAL_GUINEA' | 'ERITREA' | 'ESTONIA' | 'ETHIOPIA' | 'MALVINAS' | 'FALKLAND_ISLANDS' | 'FAROE_ISLANDS' | 'FIJI' | 'FINLAND' | 'FRANCE' | 'FRENCH_GUIANA' | 'FRENCH_POLYNESIA' | 'FRENCH_SOUTHERN_TERRITORIES' | 'GABON' | 'GAMBIA' | 'GEORGIA' | 'GERMANY' | 'GHANA' | 'GIBRALTAR' | 'GREECE' | 'GREENLAND' | 'GRENADA' | 'GUADELOUPE' | 'GUAM' | 'GUATEMALA' | 'GUERNSEY' | 'GUINEA' | 'GUINEA_BISSAU' | 'GUYANA' | 'HAITI' | 'HEARD_ISLAND_AND_MCDONALD_ISLANDS' | 'HOLY_SEE' | 'VATICAN_CITY_STATE' | 'HONDURAS' | 'HONG_KONG' | 'HUNGARY' | 'ICELAND' | 'INDIA' | 'INDONESIA' | 'IRAN' | 'IRAQ' | 'IRELAND' | 'ISLE_OF_MAN' | 'ISRAEL' | 'ITALY' | 'JAMAICA' | 'JAPAN' | 'JERSEY' | 'JORDAN' | 'KAZAKHSTAN' | 'KENYA' | 'KIRIBATI' | 'DEMOCRATIC_PEOPLES_REPUBLIC_OF_KOREA' | 'REPUBLIC_OF_KOREA' | 'KUWAIT' | 'KYRGYZSTAN' | 'LAO_PEOPLES_DEMOCRATIC_REPUBLIC' | 'LATVIA' | 'LEBANON' | 'LESOTHO' | 'LIBERIA' | 'LIBYAN_ARAB_JAMAHIRIYA' | 'LIECHTENSTEIN' | 'LITHUANIA' | 'LUXEMBOURG' | 'MACAO' | 'THE_FORMER_YUGOSLAV_REPUBLIC_OF_MACEDONIA' | 'MADAGASCAR' | 'MALAWI' | 'MALAYSIA' | 'MALDIVES' | 'MALI' | 'MALTA' | 'MARSHALL_ISLANDS' | 'MARTINIQUE' | 'MAURITANIA' | 'MAURITIUS' | 'MAYOTTE' | 'MEXICO' | 'FEDERATED_STATES_OF_MICRONESIA' | 'REPUBLIC_OF_MOLDOVA' | 'MONACO' | 'MONGOLIA' | 'MONTENEGRO' | 'MONTSERRAT' | 'MOROCCO' | 'MOZAMBIQUE' | 'MYANMAR' | 'NAMIBIA' | 'NAURU' | 'NEPAL' | 'NETHERLANDS' | 'NETHERLANDS_ANTILLES' | 'NEW_CALEDONIA' | 'NEW_ZEALAND' | 'NICARAGUA' | 'NIGER' | 'NIGERIA' | 'NIUE' | 'NORFOLK_ISLAND' | 'NORTHERN_MARIANA_ISLANDS' | 'NORWAY' | 'OMAN' | 'PAKISTAN' | 'PALAU' | 'OCCUPIED_PALESTINIAN_TERRITORY' | 'PANAMA' | 'PAPUA_NEW_GUINEA' | 'PARAGUAY' | 'PERU' | 'PHILIPPINES' | 'PITCAIRN' | 'POLAND' | 'PORTUGAL' | 'PUERTO_RICO' | 'QATAR' | 'REUNION' | 'ROMANIA' | 'RUSSIAN_FEDERATION' | 'RWANDA' | 'SAINT_BARTHELEMY' | 'SAINT_HELENA' | 'SAINT_KITTS_AND_NEVIS' | 'SAINT_LUCIA' | 'SAINT_MARTIN' | 'SAINT_PIERRE_AND_MIQUELON' | 'SAINT_VINCENT_AND_THE_GRENADINES' | 'SAMOA' | 'SAN_MARINO' | 'SAO_TOME_AND_PRINCIPE' | 'SAUDI_ARABIA' | 'SENEGAL' | 'SERBIA' | 'SEYCHELLES' | 'SIERRA_LEONE' | 'SINGAPORE' | 'SLOVAKIA' | 'SLOVENIA' | 'SOLOMON_ISLANDS' | 'SOMALIA' | 'SOUTH_AFRICA' | 'SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS' | 'SPAIN' | 'SRI_LANKA' | 'SUDAN' | 'SURINAME' | 'SVALBARD_AND_JAN_MAYEN' | 'SWAZILAND' | 'SWEDEN' | 'SWITZERLAND' | 'SYRIAN_ARAB_REPUBLIC' | 'TAIWAN' | 'TAJIKISTAN' | 'UNITED_REPUBLIC_OF_TANZANIA' | 'THAILAND' | 'TIMOR_LESTE' | 'TOGO' | 'TOKELAU' | 'TONGA' | 'TRINIDAD_AND_TOBAGO' | 'TUNISIA' | 'TURKEY' | 'TURKMENISTAN' | 'TURKS_AND_CAICOS_ISLANDS' | 'TUVALU' | 'UGANDA' | 'UKRAINE' | 'UNITED_ARAB_EMIRATES' | 'UNITED_KINGDOM' | 'UNITED_STATES_MINOR_OUTLYING_ISLANDS' | 'URUGUAY' | 'UZBEKISTAN' | 'VANUATU' | 'VENEZUELA' | 'VIET_NAM' | 'BRITISH_VIRGIN_ISLANDS' | 'US_VIRGIN_ISLANDS' | 'WALLIS_AND_FUTUNA' | 'WESTERN_SAHARA' | 'YEMEN' | 'ZAMBIA' | 'ZIMBABWE', shipsVia?: 'SMALL_PARCEL' | 'TRUCK_FREIGHT' | 'WHITE_GLOVE_BRONZE' | 'WHITE_GLOVE_SILVER' | 'WHITE_GLOVE_GOLD' | 'WHITE_GLOVE_PLATINUM' | 'WHITE_GLOVE_BRONZE_MATTRESS' | 'WHITE_GLOVE_SILVER_MATTRESS' | 'WHITE_GLOVE_GOLD_MATTRESS' | 'WHITE_GLOVE_PLATINUM_MATTRESS' | 'THRESHOLD_TO_ROOM' | 'WHITE_GLOVE_TO_THRESHOLD' | 'WHITE_GLOVE_TO_ROOM' | 'EMAIL_DELIVERY_US' | 'EMAIL_DELIVERY_UK' | 'EMAIL_DELIVERY_DE', cartonDimensions?: DimensionInput}
type DimensionInput = { length?: MeasurementInput, width?: MeasurementInput, height?: MeasurementInput}
type MeasurementInput = { value?: number, unit?: 'INCHES' | 'CENTIMETERS'}
type CatalogProject = { id?: number, name?: string, status?: 'NOT_SUBMITTED' | 'IN_REVIEW' | 'ON_HOLD' | 'COMPLETE_PRODUCT_ATTRIBUTES_NEEDED' | 'COMPLETE_LIVE' | 'CANCELLED', createdTimestamp?: string, submittedTimestamp?: string, processedTimestamp?: string, supplier?: Supplier, manufacturers?: Manufacturer[], products?: ProjectProduct[]}
type ProjectProduct = { supplierPartNumber?: string, manufacturerPartNumber?: string, name?: string, countryOfOrigin?: 'UNITED_STATES' | 'CANADA' | 'AFGHANISTAN' | 'ALAND_ISLANDS' | 'ALBANIA' | 'ALGERIA' | 'AMERICAN_SAMOA' | 'ANDORRA' | 'ANGOLA' | 'ANGUILLA' | 'ANTARCTICA' | 'ANTIGUA_AND_BARBUDA' | 'ARGENTINA' | 'ARMENIA' | 'ARUBA' | 'AUSTRALIA' | 'AUSTRIA' | 'AZERBAIJAN' | 'BAHAMAS' | 'BAHRAIN' | 'BANGLADESH' | 'BARBADOS' | 'BELARUS' | 'BELGIUM' | 'BELIZE' | 'BENIN' | 'BERMUDA' | 'BHUTAN' | 'BOLIVIA' | 'BOSNIA_AND_HERZEGOVINA' | 'BOTSWANA' | 'BOUVET_ISLAND' | 'BRAZIL' | 'BRITISH_INDIAN_OCEAN_TERRITORY' | 'BRUNEI_DARUSSALAM' | 'BULGARIA' | 'BURKINA_FASO' | 'BURUNDI' | 'CAMBODIA' | 'CAMEROON' | 'CAPE_VERDE' | 'CAYMAN_ISLANDS' | 'CENTRAL_AFRICAN_REPUBLIC' | 'CHAD' | 'CHILE' | 'CHINA' | 'CHRISTMAS_ISLAND' | 'KEELING_ISLANDS' | 'COCOS_ISLANDS' | 'COLOMBIA' | 'COMOROS' | 'CONGO' | 'THE_DEMOCRATIC_REPUBLIC_OF_THE_CONGO' | 'COOK_ISLANDS' | 'COSTA_RICA' | 'COTE_DIVOIRE' | 'CROATIA' | 'CUBA' | 'CYPRUS' | 'CZECH_REPUBLIC' | 'DENMARK' | 'DJIBOUTI' | 'DOMINICA' | 'DOMINICAN_REPUBLIC' | 'ECUADOR' | 'EGYPT' | 'EL_SALVADOR' | 'EQUATORIAL_GUINEA' | 'ERITREA' | 'ESTONIA' | 'ETHIOPIA' | 'MALVINAS' | 'FALKLAND_ISLANDS' | 'FAROE_ISLANDS' | 'FIJI' | 'FINLAND' | 'FRANCE' | 'FRENCH_GUIANA' | 'FRENCH_POLYNESIA' | 'FRENCH_SOUTHERN_TERRITORIES' | 'GABON' | 'GAMBIA' | 'GEORGIA' | 'GERMANY' | 'GHANA' | 'GIBRALTAR' | 'GREECE' | 'GREENLAND' | 'GRENADA' | 'GUADELOUPE' | 'GUAM' | 'GUATEMALA' | 'GUERNSEY' | 'GUINEA' | 'GUINEA_BISSAU' | 'GUYANA' | 'HAITI' | 'HEARD_ISLAND_AND_MCDONALD_ISLANDS' | 'HOLY_SEE' | 'VATICAN_CITY_STATE' | 'HONDURAS' | 'HONG_KONG' | 'HUNGARY' | 'ICELAND' | 'INDIA' | 'INDONESIA' | 'IRAN' | 'IRAQ' | 'IRELAND' | 'ISLE_OF_MAN' | 'ISRAEL' | 'ITALY' | 'JAMAICA' | 'JAPAN' | 'JERSEY' | 'JORDAN' | 'KAZAKHSTAN' | 'KENYA' | 'KIRIBATI' | 'DEMOCRATIC_PEOPLES_REPUBLIC_OF_KOREA' | 'REPUBLIC_OF_KOREA' | 'KUWAIT' | 'KYRGYZSTAN' | 'LAO_PEOPLES_DEMOCRATIC_REPUBLIC' | 'LATVIA' | 'LEBANON' | 'LESOTHO' | 'LIBERIA' | 'LIBYAN_ARAB_JAMAHIRIYA' | 'LIECHTENSTEIN' | 'LITHUANIA' | 'LUXEMBOURG' | 'MACAO' | 'THE_FORMER_YUGOSLAV_REPUBLIC_OF_MACEDONIA' | 'MADAGASCAR' | 'MALAWI' | 'MALAYSIA' | 'MALDIVES' | 'MALI' | 'MALTA' | 'MARSHALL_ISLANDS' | 'MARTINIQUE' | 'MAURITANIA' | 'MAURITIUS' | 'MAYOTTE' | 'MEXICO' | 'FEDERATED_STATES_OF_MICRONESIA' | 'REPUBLIC_OF_MOLDOVA' | 'MONACO' | 'MONGOLIA' | 'MONTENEGRO' | 'MONTSERRAT' | 'MOROCCO' | 'MOZAMBIQUE' | 'MYANMAR' | 'NAMIBIA' | 'NAURU' | 'NEPAL' | 'NETHERLANDS' | 'NETHERLANDS_ANTILLES' | 'NEW_CALEDONIA' | 'NEW_ZEALAND' | 'NICARAGUA' | 'NIGER' | 'NIGERIA' | 'NIUE' | 'NORFOLK_ISLAND' | 'NORTHERN_MARIANA_ISLANDS' | 'NORWAY' | 'OMAN' | 'PAKISTAN' | 'PALAU' | 'OCCUPIED_PALESTINIAN_TERRITORY' | 'PANAMA' | 'PAPUA_NEW_GUINEA' | 'PARAGUAY' | 'PERU' | 'PHILIPPINES' | 'PITCAIRN' | 'POLAND' | 'PORTUGAL' | 'PUERTO_RICO' | 'QATAR' | 'REUNION' | 'ROMANIA' | 'RUSSIAN_FEDERATION' | 'RWANDA' | 'SAINT_BARTHELEMY' | 'SAINT_HELENA' | 'SAINT_KITTS_AND_NEVIS' | 'SAINT_LUCIA' | 'SAINT_MARTIN' | 'SAINT_PIERRE_AND_MIQUELON' | 'SAINT_VINCENT_AND_THE_GRENADINES' | 'SAMOA' | 'SAN_MARINO' | 'SAO_TOME_AND_PRINCIPE' | 'SAUDI_ARABIA' | 'SENEGAL' | 'SERBIA' | 'SEYCHELLES' | 'SIERRA_LEONE' | 'SINGAPORE' | 'SLOVAKIA' | 'SLOVENIA' | 'SOLOMON_ISLANDS' | 'SOMALIA' | 'SOUTH_AFRICA' | 'SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS' | 'SPAIN' | 'SRI_LANKA' | 'SUDAN' | 'SURINAME' | 'SVALBARD_AND_JAN_MAYEN' | 'SWAZILAND' | 'SWEDEN' | 'SWITZERLAND' | 'SYRIAN_ARAB_REPUBLIC' | 'TAIWAN' | 'TAJIKISTAN' | 'UNITED_REPUBLIC_OF_TANZANIA' | 'THAILAND' | 'TIMOR_LESTE' | 'TOGO' | 'TOKELAU' | 'TONGA' | 'TRINIDAD_AND_TOBAGO' | 'TUNISIA' | 'TURKEY' | 'TURKMENISTAN' | 'TURKS_AND_CAICOS_ISLANDS' | 'TUVALU' | 'UGANDA' | 'UKRAINE' | 'UNITED_ARAB_EMIRATES' | 'UNITED_KINGDOM' | 'UNITED_STATES_MINOR_OUTLYING_ISLANDS' | 'URUGUAY' | 'UZBEKISTAN' | 'VANUATU' | 'VENEZUELA' | 'VIET_NAM' | 'BRITISH_VIRGIN_ISLANDS' | 'US_VIRGIN_ISLANDS' | 'WALLIS_AND_FUTUNA' | 'WESTERN_SAHARA' | 'YEMEN' | 'ZAMBIA' | 'ZIMBABWE', shipVia?: 'SMALL_PARCEL' | 'TRUCK_FREIGHT' | 'WHITE_GLOVE_BRONZE' | 'WHITE_GLOVE_SILVER' | 'WHITE_GLOVE_GOLD' | 'WHITE_GLOVE_PLATINUM' | 'WHITE_GLOVE_BRONZE_MATTRESS' | 'WHITE_GLOVE_SILVER_MATTRESS' | 'WHITE_GLOVE_GOLD_MATTRESS' | 'WHITE_GLOVE_PLATINUM_MATTRESS' | 'THRESHOLD_TO_ROOM' | 'WHITE_GLOVE_TO_THRESHOLD' | 'WHITE_GLOVE_TO_ROOM' | 'EMAIL_DELIVERY_US' | 'EMAIL_DELIVERY_UK' | 'EMAIL_DELIVERY_DE', length?: Dimension, width?: Dimension, height?: Dimension, weight?: Weight, manufacturer?: Manufacturer, category?: ProductCategory, validationErrors?: CatalogValidationError[]}
type ProductCategory = { id?: number, name?: string}
type CatalogValidationError = { errorLevel?: 'WARNING' | 'ERROR', errorCode?: 'SC0001' | 'SC0002' | 'SC0003' | 'SC0004' | 'SC0005' | 'SC0006' | 'SC0007' | 'SC0008' | 'SC0009' | 'SC0010' | 'SC0011' | 'SC0012' | 'SC0013' | 'SC0014' | 'SC0015' | 'SC0016' | 'SC0017' | 'SC0018' | 'SC0019' | 'SC0020' | 'SC0021' | 'SC0022' | 'SC0023' | 'SC0024' | 'SC0025' | 'SC0026' | 'SC0027' | 'SC0028' | 'SC0029' | 'SC0030' | 'SC0031' | 'CM0001', message?: string, fieldName?: string}
type InventoryMutator = { save?: TransactionStatus}
type inventoryInput = { supplierId?: number, supplierPartNumber?: string, quantityOnHand?: number, quantityBackordered?: number, quantityOnOrder?: number, itemNextAvailabilityDate?: string, productNameAndOptions?: string, discontinued?: boolean, supplier_id?: number, supplier_part_number?: string, quantity_on_hand?: number, quantity_backordered?: number, quantity_on_order?: number, item_next_availability_date?: string, product_name_and_options?: string}
type PurchaseOrderMutator = { acknowledge?: TransactionStatus, backorder?: TransactionStatus, accept?: TransactionStatus, reject?: TransactionStatus, shipment?: TransactionStatus, delivery?: TransactionStatus, requestForPickup?: TransactionStatus, register?: LabelGenerationEvent, generateManifest?: ManifestGenerationEvent, acknowledgeCastleGate?: TransactionStatus, acknowledgeCastleGateWarehouseShippingAdvice?: TransactionStatus}
type BackorderedLineItemInput = { partNumber?: string, quantity?: number, unitPrice?: number, newShipDate?: string}
type AcceptedLineItemInput = { partNumber?: string, quantity?: number, unitPrice?: number, estimatedShipDate?: string}
type RejectLineItemInput = { partNumber?: string, quantity?: number}
type ShipNoticeInput = { poNumber?: string, supplierId?: number, packageCount?: number, weight?: number, volume?: number, carrierCode?: string, shipSpeed?: 'SECOND_DAY_AIR' | 'SECOND_DAY_AIR_FREE' | 'FIVE_DAY_DIRECT' | 'THREE_DAY' | 'CONTAINER' | 'EMAIL' | 'FEDEX_HOME' | 'GROUND' | 'PAKETVERSAND' | 'IMPERIAL_POOL_FREIGHT' | 'NEXT_DAY' | 'NEXT_DAY_OVERSEAS' | 'NEXT_MORNING' | 'NEXT_DAY_BEFORE_NINE' | 'WILL_CALL' | 'SATURDAY_DELIVERY' | 'TRUCK_FREIGHT_CASKETS_ONE_DAY' | 'TRUCK_FREIGHT_CASKETS_TWO_DAY' | 'CURBSIDE_WITH_UNLOAD' | 'TRUCK_LOAD' | 'CURBSIDE' | 'WHITE_GLOVE_BRONZE' | 'WHITE_GLOVE_GOLD' | 'WHITE_GLOVE_TWO_MAN' | 'WHITE_GLOVE_PLATINUM' | 'WHITE_GLOVE_SILVER' | 'TRUCK_FREIGHT_THRESHOLD' | 'STANDARD_VERSAND_SPERRGUT' | 'ALMO' | 'LARGE_PARCEL_COURIER' | 'EUROPEAN_LINE_HAUL' | 'ECONOMY' | 'WHITE_GLOVE_ROOM_OF_CHOICE' | 'TINY_PARCEL' | 'GROUND_OVERSEA' | 'LOW_COST_CARRIER' | 'WHITE_GLOVE_INNOVEL' | 'BACKYARD' | 'CURBSIDE_DELIVERY', trackingNumber?: string, shipDate?: string, sourceAddress?: AddressInput, destinationAddress?: AddressInput, smallParcelShipments?: [Package: PurchaseOrderPackageInput, items: [partNumber: string, quantity: number]], largeParcelShipments?: [partNumber: string, packages: [code: PackageTrackingCode, weight: number]]}
type AddressInput = { name?: string, streetAddress1?: string, streetAddress2?: string, city?: string, state?: string, postalCode?: string, country?: string}
type SmallParcelShipmentInput = { package?: PurchaseOrderPackageInput, items?: [partNumber: string, quantity: number]}
type PurchaseOrderPackageInput = { code?: PackageTrackingCode, weight?: number}
type PackageTrackingCode = { type?: 'TRACKING_NUMBER' | 'UCC_128', value?: string}
type SmallParcelItemInput = { partNumber?: string, quantity?: number}
type LargeParcelShipmentInput = { partNumber?: string, packages?: [code: PackageTrackingCode, weight: number]}
type DeliveryNoticeInput = { poNumber?: string, supplierId?: number, packageCount?: number, weight?: number, volume?: number, carrierCode?: string, shipSpeed?: 'SECOND_DAY_AIR' | 'SECOND_DAY_AIR_FREE' | 'FIVE_DAY_DIRECT' | 'THREE_DAY' | 'CONTAINER' | 'EMAIL' | 'FEDEX_HOME' | 'GROUND' | 'PAKETVERSAND' | 'IMPERIAL_POOL_FREIGHT' | 'NEXT_DAY' | 'NEXT_DAY_OVERSEAS' | 'NEXT_MORNING' | 'NEXT_DAY_BEFORE_NINE' | 'WILL_CALL' | 'SATURDAY_DELIVERY' | 'TRUCK_FREIGHT_CASKETS_ONE_DAY' | 'TRUCK_FREIGHT_CASKETS_TWO_DAY' | 'CURBSIDE_WITH_UNLOAD' | 'TRUCK_LOAD' | 'CURBSIDE' | 'WHITE_GLOVE_BRONZE' | 'WHITE_GLOVE_GOLD' | 'WHITE_GLOVE_TWO_MAN' | 'WHITE_GLOVE_PLATINUM' | 'WHITE_GLOVE_SILVER' | 'TRUCK_FREIGHT_THRESHOLD' | 'STANDARD_VERSAND_SPERRGUT' | 'ALMO' | 'LARGE_PARCEL_COURIER' | 'EUROPEAN_LINE_HAUL' | 'ECONOMY' | 'WHITE_GLOVE_ROOM_OF_CHOICE' | 'TINY_PARCEL' | 'GROUND_OVERSEA' | 'LOW_COST_CARRIER' | 'WHITE_GLOVE_INNOVEL' | 'BACKYARD' | 'CURBSIDE_DELIVERY', trackingNumber?: string, deliveryDate?: string, sourceAddress?: AddressInput, destinationAddress?: AddressInput, smallParcelShipments?: [Package: PurchaseOrderPackageInput, items: [partNumber: string, quantity: number]], largeParcelShipments?: [partNumber: string, packages: [code: PackageTrackingCode, weight: number]]}
type RequestForPickupInput = { supplierId?: number, poNumber?: string, shipFromAddress?: AddressInput, shipToAddress?: AddressInput, cartonCount?: number, totalWeight?: number, items?: [partNumber: string, carrierCode: string, shipSpeed: 'SECOND_DAY_AIR' | 'SECOND_DAY_AIR_FREE' | 'FIVE_DAY_DIRECT' | 'THREE_DAY' | 'CONTAINER' | 'EMAIL' | 'FEDEX_HOME' | 'GROUND' | 'PAKETVERSAND' | 'IMPERIAL_POOL_FREIGHT' | 'NEXT_DAY' | 'NEXT_DAY_OVERSEAS' | 'NEXT_MORNING' | 'NEXT_DAY_BEFORE_NINE' | 'WILL_CALL' | 'SATURDAY_DELIVERY' | 'TRUCK_FREIGHT_CASKETS_ONE_DAY' | 'TRUCK_FREIGHT_CASKETS_TWO_DAY' | 'CURBSIDE_WITH_UNLOAD' | 'TRUCK_LOAD' | 'CURBSIDE' | 'WHITE_GLOVE_BRONZE' | 'WHITE_GLOVE_GOLD' | 'WHITE_GLOVE_TWO_MAN' | 'WHITE_GLOVE_PLATINUM' | 'WHITE_GLOVE_SILVER' | 'TRUCK_FREIGHT_THRESHOLD' | 'STANDARD_VERSAND_SPERRGUT' | 'ALMO' | 'LARGE_PARCEL_COURIER' | 'EUROPEAN_LINE_HAUL' | 'ECONOMY' | 'WHITE_GLOVE_ROOM_OF_CHOICE' | 'TINY_PARCEL' | 'GROUND_OVERSEA' | 'LOW_COST_CARRIER' | 'WHITE_GLOVE_INNOVEL' | 'BACKYARD' | 'CURBSIDE_DELIVERY', unitPrice: number, quantity: number, pickupDatetime: string]}
type RequestForPickupItemInput = { partNumber?: string, carrierCode?: string, shipSpeed?: 'SECOND_DAY_AIR' | 'SECOND_DAY_AIR_FREE' | 'FIVE_DAY_DIRECT' | 'THREE_DAY' | 'CONTAINER' | 'EMAIL' | 'FEDEX_HOME' | 'GROUND' | 'PAKETVERSAND' | 'IMPERIAL_POOL_FREIGHT' | 'NEXT_DAY' | 'NEXT_DAY_OVERSEAS' | 'NEXT_MORNING' | 'NEXT_DAY_BEFORE_NINE' | 'WILL_CALL' | 'SATURDAY_DELIVERY' | 'TRUCK_FREIGHT_CASKETS_ONE_DAY' | 'TRUCK_FREIGHT_CASKETS_TWO_DAY' | 'CURBSIDE_WITH_UNLOAD' | 'TRUCK_LOAD' | 'CURBSIDE' | 'WHITE_GLOVE_BRONZE' | 'WHITE_GLOVE_GOLD' | 'WHITE_GLOVE_TWO_MAN' | 'WHITE_GLOVE_PLATINUM' | 'WHITE_GLOVE_SILVER' | 'TRUCK_FREIGHT_THRESHOLD' | 'STANDARD_VERSAND_SPERRGUT' | 'ALMO' | 'LARGE_PARCEL_COURIER' | 'EUROPEAN_LINE_HAUL' | 'ECONOMY' | 'WHITE_GLOVE_ROOM_OF_CHOICE' | 'TINY_PARCEL' | 'GROUND_OVERSEA' | 'LOW_COST_CARRIER' | 'WHITE_GLOVE_INNOVEL' | 'BACKYARD' | 'CURBSIDE_DELIVERY', unitPrice?: number, quantity?: number, pickupDatetime?: string}
type RegistrationInput = { poNumber?: string, warehouseId?: number, requestForPickupDate?: string, shippingUnits?: [partNumber: string, unitType: 'CARTON' | 'BAG' | 'ROLL' | 'OTHER', weight: WeightInput, dimensions: DimensionInput, freightClass: 'CODE_500' | 'CODE_400' | 'CODE_300' | 'CODE_250' | 'CODE_200' | 'CODE_175' | 'CODE_150' | 'CODE_125' | 'CODE_110' | 'CODE_100' | 'CODE_92_5' | 'CODE_85' | 'CODE_77_5' | 'CODE_70' | 'CODE_65' | 'CODE_60' | 'CODE_55' | 'CODE_50', palletInfo: PalletInput, groupIdentifier: number, sequenceIdentifier: number], packageUnits?: [unitType: 'CARTON' | 'BAG' | 'ROLL' | 'OTHER', weight: WeightInput, dimensions: DimensionInput, freightClass: 'CODE_500' | 'CODE_400' | 'CODE_300' | 'CODE_250' | 'CODE_200' | 'CODE_175' | 'CODE_150' | 'CODE_125' | 'CODE_110' | 'CODE_100' | 'CODE_92_5' | 'CODE_85' | 'CODE_77_5' | 'CODE_70' | 'CODE_65' | 'CODE_60' | 'CODE_55' | 'CODE_50', containedParts: [partNumber: string, groupIdentifier: number]]}
type ShippingUnitInput = { partNumber?: string, unitType?: 'CARTON' | 'BAG' | 'ROLL' | 'OTHER', weight?: WeightInput, dimensions?: DimensionInput, freightClass?: 'CODE_500' | 'CODE_400' | 'CODE_300' | 'CODE_250' | 'CODE_200' | 'CODE_175' | 'CODE_150' | 'CODE_125' | 'CODE_110' | 'CODE_100' | 'CODE_92_5' | 'CODE_85' | 'CODE_77_5' | 'CODE_70' | 'CODE_65' | 'CODE_60' | 'CODE_55' | 'CODE_50', palletInfo?: PalletInput, groupIdentifier?: number, sequenceIdentifier?: number}
type WeightInput = { value?: number, unit?: 'POUNDS' | 'KILOGRAMS'}
type PalletInput = { weight?: WeightInput}
type PackageUnit = { unitType?: 'CARTON' | 'BAG' | 'ROLL' | 'OTHER', weight?: WeightInput, dimensions?: DimensionInput, freightClass?: 'CODE_500' | 'CODE_400' | 'CODE_300' | 'CODE_250' | 'CODE_200' | 'CODE_175' | 'CODE_150' | 'CODE_125' | 'CODE_110' | 'CODE_100' | 'CODE_92_5' | 'CODE_85' | 'CODE_77_5' | 'CODE_70' | 'CODE_65' | 'CODE_60' | 'CODE_55' | 'CODE_50', containedParts?: [partNumber: string, groupIdentifier: number]}
type ContainedPart = { partNumber?: string, groupIdentifier?: number}
type ManifestInput = { poNumbers?: string, date?: string}
type ManifestGenerationEvent = { manifestDocument?: ManifestDocument}
type ManifestDocument = { url?: string}
type B2bArInvoice = { id?: number, description?: string, status?: 'NEW' | 'PENDING_APPROVAL' | 'APPROVED' | 'SENT_TO_RECIPIENT' | 'PENDING_PAYMENT' | 'PARTIALLY_PAID' | 'FULLY_PAID' | 'REJECTED' | 'CANCELLED', revenueSource?: 'B2B' | 'CASTLEGATE' | 'SPONSORED_PRODUCTS' | 'MAAS_MEDIA' | 'LIQUIDATION' | 'GIFT_CARD', dueBy?: string, paidOn?: string, currency?: 'US_DOLLAR' | 'BRITISH_POUND' | 'EURO' | 'CANADIAN_DOLLAR' | 'AUSTRALIAN_DOLLAR', invoiceAmount?: number, taxTotalAmount?: number, originalInvoiceTotalAmount?: number, originalTaxTotalAmount?: number, paidAmount?: number, dueAmount?: number, details?: ArInvoiceDetailInterface[], documents?: ArInvoiceDocument[], customer?: Customer, orders?: Order[], orderPayments?: OrderPayment[], communications?: ArInvoiceCommunication[], creator?: ArInvoiceCreator, createdOn?: string, effectiveOn?: string, isReconciled?: boolean, reconciledBy?: ArReconciler, nettable?: boolean, originallyNettable?: boolean, invoiceReceipientsEmailAddresses?: string, payments?: ArPayment[], isCreditMemo?: boolean, creditMemos?: ArInvoiceInterface[], statusUpdateLogs?: ArInvoiceStatusUpdateLog[]}
type ArInvoiceInterface = { id?: number, description?: string, status?: 'NEW' | 'PENDING_APPROVAL' | 'APPROVED' | 'SENT_TO_RECIPIENT' | 'PENDING_PAYMENT' | 'PARTIALLY_PAID' | 'FULLY_PAID' | 'REJECTED' | 'CANCELLED', revenueSource?: 'B2B' | 'CASTLEGATE' | 'SPONSORED_PRODUCTS' | 'MAAS_MEDIA' | 'LIQUIDATION' | 'GIFT_CARD', dueBy?: string, paidOn?: string, currency?: 'US_DOLLAR' | 'BRITISH_POUND' | 'EURO' | 'CANADIAN_DOLLAR' | 'AUSTRALIAN_DOLLAR', invoiceAmount?: number, taxTotalAmount?: number, originalInvoiceTotalAmount?: number, originalTaxTotalAmount?: number, paidAmount?: number, dueAmount?: number, documents?: ArInvoiceDocument[], communications?: ArInvoiceCommunication[], creator?: ArInvoiceCreator, createdOn?: string, effectiveOn?: string, isReconciled?: boolean, reconciledBy?: ArReconciler, nettable?: boolean, originallyNettable?: boolean, invoiceReceipientsEmailAddresses?: string, payments?: ArPayment[], isCreditMemo?: boolean, statusUpdateLogs?: ArInvoiceStatusUpdateLog[]}
type ArInvoiceDocument = { id?: number, name?: string, createdOn?: string, type?: 'pdf' | 'csv', path?: string}
type ArInvoiceCommunication = { id?: number, type?: 'UNSPECIFIED' | 'INITIAL_COMMUNICATION' | 'CANCELLATION_COMMUNICATION' | 'NETTABLE_REMOVED', queuedOn?: string, emailMessage?: EmailMessage}
type EmailMessage = { id?: number}
type ArInvoiceCreator = { id?: number, type?: 'SUPPLIER' | 'ADMIN_USER' | 'EXTRANET_USER' | 'INTERNAL'}
type ArReconciler = { id?: number, type?: 'ADMIN_USER' | 'AP_PAYMENT_PROCESSOR'}
type ArPayment = { id?: number, status?: 'NEW' | 'PARTIALLY_MATCHED' | 'FULLY_MATCHED' | 'VOID', revenueSource?: 'B2B' | 'CASTLEGATE' | 'SPONSORED_PRODUCTS' | 'MAAS_MEDIA' | 'LIQUIDATION' | 'GIFT_CARD', amount?: number, currency?: 'US_DOLLAR' | 'BRITISH_POUND' | 'EURO' | 'CANADIAN_DOLLAR' | 'AUSTRALIAN_DOLLAR', reference?: ArPaymentReference, payer?: ArPaymentPayer, createdOn?: string, description?: string, matchedAmount?: number, isReconciled?: boolean, reconciledOn?: string, reconciledBy?: ArReconciler}
type ArPaymentReference = { id?: number, type?: 'SELF' | 'CLASSIFICATION_TOOL' | 'AP_VOUCHER'}
type ArPaymentPayer = { id?: number, type?: 'SUPPLIER' | 'AP_VOUCHER' | 'CUSTOMER' | 'FULFILLMENT_CUSTOMER'}
type ArInvoiceStatusUpdateLog = { id?: number, fromStatus?: 'NEW' | 'PENDING_APPROVAL' | 'APPROVED' | 'SENT_TO_RECIPIENT' | 'PENDING_PAYMENT' | 'PARTIALLY_PAID' | 'FULLY_PAID' | 'REJECTED' | 'CANCELLED', toStatus?: 'NEW' | 'PENDING_APPROVAL' | 'APPROVED' | 'SENT_TO_RECIPIENT' | 'PENDING_PAYMENT' | 'PARTIALLY_PAID' | 'FULLY_PAID' | 'REJECTED' | 'CANCELLED', updatedOn?: string, updatedBy?: WayfairEmployee}
type WayfairEmployee = { id?: number, firstName?: string, middleName?: string, lastName?: string, fullName?: string, userName?: string, nickname?: string, displayLastName?: string, email?: string, samAccountName?: string, isActive?: boolean, birthday?: string, seniorityDate?: string, startDate?: string, forecastEndDate?: string, terminationDate?: string, isUnlimitedContract?: boolean, isEngineer?: boolean, worksOnSoftware?: boolean, title?: WayfairJobTitle, profile?: WayfairEmployeeProfile, type?: WayfairEmployeeCategory, location?: WayfairEmployeeLocation, phoneExtension?: string, manager?: WayfairEmployee, workgroup?: WayfairWorkgroup, processedByEmployee?: WayfairEmployee, directReports?: WayfairEmployee[]}
type WayfairJobTitle = { id?: number, name?: string, employeeRank?: WayfairEmployeeRank}
type WayfairEmployeeRank = { id?: number, name?: string, level?: number}
type WayfairEmployeeProfile = { id?: number, name?: string, isOffshore?: boolean}
type WayfairEmployeeCategory = { id?: number, name?: string}
type WayfairEmployeeLocation = { id?: number, name?: string, officeCode?: string}
type WayfairWorkgroup = { id?: number, name?: string, supervisor?: WayfairEmployee, employees?: WayfairEmployee[]}
type ArInvoiceDetailInterface = { id?: number, quantity?: number, unitAmount?: number, itemAmount?: number, description?: string, taxes?: taxByType[]}
type taxByType = { type?: 'SalesTax' | 'SellersUseTax' | 'EcoFee' | 'SHP' | 'GST' | 'PST' | 'QST' | 'HST' | 'VAT' | 'NA', value?: number}
type Customer = { id?: number, firstName?: string, lastName?: string, postalCode?: string, email?: string, contactAtPhone?: string}
type Customer_Interface = { id?: number, firstName?: string, lastName?: string, postalCode?: string, email?: string, contactAtPhone?: string}
type Order = { id?: number}
type OrderPayment = { id?: number}
type B2bArInvoiceDetail = { id?: number, quantity?: number, unitAmount?: number, itemAmount?: number, description?: string, orderProduct?: OrderProduct, taxes?: taxByType[]}
type OrderProduct = { id?: number}
type CastlegateArInvoice = { id?: number, description?: string, status?: 'NEW' | 'PENDING_APPROVAL' | 'APPROVED' | 'SENT_TO_RECIPIENT' | 'PENDING_PAYMENT' | 'PARTIALLY_PAID' | 'FULLY_PAID' | 'REJECTED' | 'CANCELLED', isApproved?: boolean, approvedOn?: string, revenueSource?: 'B2B' | 'CASTLEGATE' | 'SPONSORED_PRODUCTS' | 'MAAS_MEDIA' | 'LIQUIDATION' | 'GIFT_CARD', dueBy?: string, paidOn?: string, currency?: 'US_DOLLAR' | 'BRITISH_POUND' | 'EURO' | 'CANADIAN_DOLLAR' | 'AUSTRALIAN_DOLLAR', invoiceAmount?: number, taxTotalAmount?: number, originalInvoiceTotalAmount?: number, originalTaxTotalAmount?: number, paidAmount?: number, dueAmount?: number, startsOn?: string, endsOn?: string, details?: ArInvoiceDetailInterface[], documents?: ArInvoiceDocument[], fulfillmentCustomer?: CastlegateFulfillmentCustomer, communications?: ArInvoiceCommunication[], creator?: ArInvoiceCreator, createdOn?: string, effectiveOn?: string, isReconciled?: boolean, reconciledBy?: ArReconciler, nettable?: boolean, originallyNettable?: boolean, invoiceReceipientsEmailAddresses?: string, payments?: ArPayment[], isCreditMemo?: boolean, creditMemos?: ArInvoiceInterface[], invoiceType?: 'TRANSPORTATION' | 'FULFILLMENT', statusUpdateLogs?: ArInvoiceStatusUpdateLog[]}
type CastlegateFulfillmentCustomer = { id?: number, supplier?: Supplier, name?: string, service?: 'FULFILLMENT' | 'CANADA_FULFILLMENT' | 'EU_FULFILLMENT' | 'DRAY' | 'OCEAN' | 'ASIA_CONSOLIDATION', oceanService?: OceanServiceProfile, aggregateHistoricalForecast?: ReplenishmentForecast, aggregateFutureForecast?: ReplenishmentForecast, aggregateHistoricalSales?: TimelineElement[], isPartDataEnabled?: boolean}
type OceanServiceProfile = { fulfillmentCustomer?: CastlegateFulfillmentCustomer, activationDate?: string}
type ReplenishmentForecast = { values?: TimelineElement[], timeframe?: 'HISTORICAL' | 'FUTURE'}
type TimelineElement = { date?: string, value?: number}
type CastlegateArInvoiceDetail = { id?: number, quantity?: number, unitAmount?: number, itemAmount?: number, description?: string, charge?: FulfillmentCustomerCharge, taxes?: taxByType[]}
type FulfillmentCustomerCharge = { id?: number}
type SponsoredProductsArInvoice = { id?: number, description?: string, status?: 'NEW' | 'PENDING_APPROVAL' | 'APPROVED' | 'SENT_TO_RECIPIENT' | 'PENDING_PAYMENT' | 'PARTIALLY_PAID' | 'FULLY_PAID' | 'REJECTED' | 'CANCELLED', revenueSource?: 'B2B' | 'CASTLEGATE' | 'SPONSORED_PRODUCTS' | 'MAAS_MEDIA' | 'LIQUIDATION' | 'GIFT_CARD', dueBy?: string, paidOn?: string, currency?: 'US_DOLLAR' | 'BRITISH_POUND' | 'EURO' | 'CANADIAN_DOLLAR' | 'AUSTRALIAN_DOLLAR', invoiceAmount?: number, taxTotalAmount?: number, originalInvoiceTotalAmount?: number, originalTaxTotalAmount?: number, paidAmount?: number, dueAmount?: number, supplier?: Supplier, details?: ArInvoiceDetailInterface[], documents?: ArInvoiceDocument[], communications?: ArInvoiceCommunication[], creator?: ArInvoiceCreator, createdOn?: string, effectiveOn?: string, isReconciled?: boolean, reconciledBy?: ArReconciler, nettable?: boolean, originallyNettable?: boolean, invoiceReceipientsEmailAddresses?: string, payments?: ArPayment[], isCreditMemo?: boolean, creditMemos?: ArInvoiceInterface[], statusUpdateLogs?: ArInvoiceStatusUpdateLog[]}
type SponsoredProductsArInvoiceDetail = { id?: number, quantity?: number, unitAmount?: number, itemAmount?: number, description?: string, taxes?: taxByType[]}
type MaasArInvoice = { id?: number, description?: string, status?: 'NEW' | 'PENDING_APPROVAL' | 'APPROVED' | 'SENT_TO_RECIPIENT' | 'PENDING_PAYMENT' | 'PARTIALLY_PAID' | 'FULLY_PAID' | 'REJECTED' | 'CANCELLED', revenueSource?: 'B2B' | 'CASTLEGATE' | 'SPONSORED_PRODUCTS' | 'MAAS_MEDIA' | 'LIQUIDATION' | 'GIFT_CARD', dueBy?: string, paidOn?: string, currency?: 'US_DOLLAR' | 'BRITISH_POUND' | 'EURO' | 'CANADIAN_DOLLAR' | 'AUSTRALIAN_DOLLAR', invoiceAmount?: number, taxTotalAmount?: number, originalInvoiceTotalAmount?: number, originalTaxTotalAmount?: number, paidAmount?: number, dueAmount?: number, supplier?: Supplier, details?: ArInvoiceDetailInterface[], documents?: ArInvoiceDocument[], communications?: ArInvoiceCommunication[], creator?: ArInvoiceCreator, createdOn?: string, isReconciled?: boolean, reconciledBy?: ArReconciler, nettable?: boolean, originallyNettable?: boolean, netTerms?: 'NET_15' | 'NET_30' | 'NET_45' | 'NET_60' | 'NET_90', effectiveOn?: string, invoiceReceipientsEmailAddresses?: string, additionalInvoiceRecipientEmailAddresses?: string, discounts?: ArInvoiceAdjustment[], payments?: ArPayment[], isCreditMemo?: boolean, creditMemos?: ArInvoiceInterface[], statusUpdateLogs?: ArInvoiceStatusUpdateLog[]}
type ArInvoiceAdjustment = { id?: number, description?: string, quantity?: number, unitAmount?: number, amount?: number}
type MaasArInvoiceDetail = { id?: number, quantity?: number, unitAmount?: number, itemAmount?: number, description?: string, manufacturerPartsId?: number, modelerAssignmentId?: number, taxes?: taxByType[], discounts?: ArInvoiceAdjustment[]}
type BJSShippingLabelInfo = { carrier?: string, carrierCode?: string, trackingNumber?: string, weight?: Weight, barcodeNumber?: string, dimensions?: PackageDimensionType, serviceLevel?: string, depotCode?: string}
type PackageDimensionType = { length?: Dimension, width?: Dimension, height?: Dimension}
type DPDShippingLabelInfo = { carrier?: string, carrierCode?: string, trackingNumber?: string, weight?: Weight, barcodeText?: string, dimensions?: PackageDimensionType, originSort?: string, destinationSort?: string, destinationDepotCode?: string, serviceCode?: string, originDepotCode?: string, originDepotAddress?: Address}
type LiquidationArInvoice = { id?: number, description?: string, status?: 'NEW' | 'PENDING_APPROVAL' | 'APPROVED' | 'SENT_TO_RECIPIENT' | 'PENDING_PAYMENT' | 'PARTIALLY_PAID' | 'FULLY_PAID' | 'REJECTED' | 'CANCELLED', revenueSource?: 'B2B' | 'CASTLEGATE' | 'SPONSORED_PRODUCTS' | 'MAAS_MEDIA' | 'LIQUIDATION' | 'GIFT_CARD', dueBy?: string, paidOn?: string, currency?: 'US_DOLLAR' | 'BRITISH_POUND' | 'EURO' | 'CANADIAN_DOLLAR' | 'AUSTRALIAN_DOLLAR', originalInvoiceTotalAmount?: number, originalTaxTotalAmount?: number, paidAmount?: number, dueAmount?: number, details?: ArInvoiceDetailInterface[], documents?: ArInvoiceDocument[], liquidator?: Customer, order?: Order, communications?: ArInvoiceCommunication[], creator?: ArInvoiceCreator, createdOn?: string, effectiveOn?: string, isReconciled?: boolean, reconciledBy?: ArReconciler, nettable?: boolean, originallyNettable?: boolean, invoiceAmount?: number, taxTotalAmount?: number, invoiceReceipientsEmailAddresses?: string, payments?: ArPayment[], isCreditMemo?: boolean, creditMemos?: ArInvoiceInterface[], statusUpdateLogs?: ArInvoiceStatusUpdateLog[]}
type LiquidationArInvoiceDetail = { id?: number, quantity?: number, unitAmount?: number, itemAmount?: number, description?: string, taxes?: taxByType[]}
type CachedInternationalStockPurchaseOrder = { id?: number, serviceLevel?: 'NGS' | 'NVO' | 'DRA' | 'NRV' | 'BCO' | 'ACN' | 'ACI' | 'OND'}
type InternationalStockPurchaseOrderReturnType = { id?: number, serviceLevel?: 'NGS' | 'NVO' | 'DRA' | 'NRV' | 'BCO' | 'ACN' | 'ACI' | 'OND'}
type GiftCardArInvoice = { id?: number, description?: string, status?: 'NEW' | 'PENDING_APPROVAL' | 'APPROVED' | 'SENT_TO_RECIPIENT' | 'PENDING_PAYMENT' | 'PARTIALLY_PAID' | 'FULLY_PAID' | 'REJECTED' | 'CANCELLED', revenueSource?: 'B2B' | 'CASTLEGATE' | 'SPONSORED_PRODUCTS' | 'MAAS_MEDIA' | 'LIQUIDATION' | 'GIFT_CARD', dueBy?: string, paidOn?: string, currency?: 'US_DOLLAR' | 'BRITISH_POUND' | 'EURO' | 'CANADIAN_DOLLAR' | 'AUSTRALIAN_DOLLAR', invoiceAmount?: number, taxTotalAmount?: number, originalInvoiceTotalAmount?: number, originalTaxTotalAmount?: number, paidAmount?: number, dueAmount?: number, customer?: Customer, orderCategory?: 'BRAND' | 'OFFICE_SUPPLIES' | 'PHOTO_STUDIO' | 'PUBLIC_RELATIONS' | 'SAMPLE_COST' | 'TRIED_AND_TRUE_MARKETING' | 'CONTENT', details?: ArInvoiceDetailInterface[], documents?: ArInvoiceDocument[], communications?: ArInvoiceCommunication[], creator?: ArInvoiceCreator, createdOn?: string, effectiveOn?: string, isReconciled?: boolean, reconciledBy?: ArReconciler, nettable?: boolean, originallyNettable?: boolean, invoiceReceipientsEmailAddresses?: string, payments?: ArPayment[], isCreditMemo?: boolean, creditMemos?: ArInvoiceInterface[], statusUpdateLogs?: ArInvoiceStatusUpdateLog[]}
type GiftCardArInvoiceDetail = { id?: number, quantity?: number, unitAmount?: number, itemAmount?: number, description?: string, pan?: string, transactionId?: string, externalReference?: string, taxes?: taxByType[], discounts?: ArInvoiceAdjustment[]}
type BrandImage = { componentMetaData?: BrandComponentMetadataType, ireid?: number, mobileIreid?: number, altText?: string}
type BrandComponentInterface = { componentMetaData?: BrandComponentMetadataType}
type BrandComponentMetadataType = { componentId?: number, componentType?: number, versionId?: number, isEnabled?: boolean, rank?: number, qaStatus?: number, rejectionReasons?: number, rejectionNote?: string, isValidForDisplay?: boolean}
type BrandDescription = { componentMetaData?: BrandComponentMetadataType, text?: string}
type BrandImageCta = { componentMetaData?: BrandComponentMetadataType, headerText?: string, description?: string, ctaLink?: string, ctaText?: string, ireid?: number, textLocation?: 'TEXT_LOCATION_RIGHT' | 'TEXT_LOCATION_LEFT'}
type BrandCtaInterface = { headerText?: string, description?: string, ctaLink?: string, ctaText?: string}
type BrandImageCtaCollection = { componentMetaData?: BrandComponentMetadataType, collection?: BrandImageCta[], headline?: string, isSquare?: boolean, subheaderText?: string, mobileLayout?: 'MOBILE_LAYOUT_CAROUSEL' | 'MOBILE_LAYOUT_SINGLE_COLUMN'}
type BrandValuePropImageCollection = { componentMetaData?: BrandComponentMetadataType, collection?: BrandValuePropImage[], headline?: string}
type BrandValuePropImage = { componentMetaData?: BrandComponentMetadataType, headerText?: string, description?: string, ctaLink?: string, ctaText?: string, ireid?: number, textLocation?: 'TEXT_LOCATION_RIGHT' | 'TEXT_LOCATION_LEFT', textBullets?: string}
type BrandVideoCta = { componentMetaData?: BrandComponentMetadataType, headerText?: string, description?: string, ctaLink?: string, ctaText?: string, vreid?: number, previewImageId?: number, sources?: string, textLocation?: 'TEXT_LOCATION_RIGHT' | 'TEXT_LOCATION_LEFT'}
type BrandProductsCta = { componentMetaData?: BrandComponentMetadataType, headerText?: string, description?: string, ctaLink?: string, ctaText?: string, eventId?: number, ireid?: number, headline?: string, isCriteriaEvent?: boolean}
type BrandProductCarousel = { componentMetaData?: BrandComponentMetadataType, headerText?: string, description?: string, ctaLink?: string, ctaText?: string, eventId?: number, headline?: string, isCriteriaEvent?: boolean}
type BrandShopByAttribute = { componentMetaData?: BrandComponentMetadataType, attributeName?: string, description?: string, eventId?: number, filterOptions?: BrandShopByAttributeFilterOptionType[]}
type BrandShopByAttributeFilterOptionType = { id?: string, url?: string}
type BrandTextBlock = { componentMetaData?: BrandComponentMetadataType, text?: string, headline?: string}
type BrandVideoHero = { componentMetaData?: BrandComponentMetadataType, vreid?: number, previewImageId?: number}
type BrandBannerCta = { componentMetaData?: BrandComponentMetadataType, headerText?: string, description?: string, ctaLink?: string, ctaText?: string, subheaderText?: string, ireid?: number, ctaOrientation?: 'LEFT' | 'RIGHT' | 'CENTER'}
type BrandDefaultComponent = { componentMetaData?: BrandComponentMetadataType}
type BrandSTLRoomExplorer = { componentMetaData?: BrandComponentMetadataType, tabs?: BrandSTLRoomExplorerTab[]}
type BrandSTLRoomExplorerTab = { headerText?: string, description?: string, ctaLink?: string, ctaText?: string, ireid?: number, tabName?: string, tabRank?: number}
type BrandImageLiveText = { componentMetaData?: BrandComponentMetadataType, headerText?: string, description?: string, ctaLink?: string, ctaText?: string, ireid?: number, isDarkText?: boolean, hasOverlay?: boolean, alignment?: 'LEFT' | 'RIGHT' | 'CENTER'}
type BrandCelebrityFooter = { componentMetaData?: BrandComponentMetadataType, text?: string, ireid?: number, logoIreid?: number}
type BrandShopCardCarousel = { componentMetaData?: BrandComponentMetadataType, headerText?: string, description?: string, manufacturerIds?: number}
type BrandCustomizedNavigation = { componentMetaData?: BrandComponentMetadataType, headerText?: string, description?: string, links?: BrandCustomizedNavigationLinkType[]}
type BrandCustomizedNavigationLinkType = { name?: string, url?: string, ireid?: number}
type BrandB2BDynamicBAMCard = { componentMetaData?: BrandComponentMetadataType, managedAccountHeaderText?: string, unmanagedAccountHeaderText?: string}
type BrandSubcategoryNavigation = { componentMetaData?: BrandComponentMetadataType, headerText?: string, subheaderText?: string, useLargeImagery?: boolean}
type DeepReplace<T> = {
    [P in keyof T]: T[P] extends object
    ? DeepReplace<T[P]>
    : boolean;
}
class Wayfair {
    
    /**
    * Loads the API applications.
    * @param filters A list of filters to apply.
	* @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
	* @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
	* @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results. 
    * @returns A list where each element is: A single Wayfair API application.
    */
    query_applications = async (
        auth: { client_id: string, client_secret: string, base_url: string },        
        query: { __args: {filters?: [field: 'clientId' | 'clientSecret' | 'name' | 'description' | 'isSandbox' | 'clientType' | 'createdDate', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean], ordering?: [asc: string, desc: string], limit?: number, offset?: number} } & DeepReplace<Application>
    ): Promise<{data: { applications: Application[]}}> => ax(auth, {query: `{${jsonToGraphQLQuery({ applications: query})}}`})
    
	
    /**
    * Retrieves CastleGate purchase orders.
    * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
	* @param hasResponse The Purchase Order open status. Whether the purchase order is open.
	* @param fromDate The Purchase Order starting date period. Specifies the starting date from which to grab purchase orders.
	* @param poNumbers The list of Purchase Order numbers to return.
	* @param sortOrder Order the result set by ascending or descending order of poDate. 
    * @returns A list where each element is: A purchase order.
    */
    query_get_castle_gate_purchase_orders = async (
        auth: { client_id: string, client_secret: string, base_url: string },        
        query: { __args: {limit?: number, hasResponse?: boolean, fromDate?: string, poNumbers?: string, sortOrder?: 'ASC' | 'DESC'} } & DeepReplace<PurchaseOrder>
    ): Promise<{data: { getCastleGatePurchaseOrders: PurchaseOrder[]}}> => ax(auth, {query: `{${jsonToGraphQLQuery({ getCastleGatePurchaseOrders: query})}}`})
    
	
    /**
    * Loads CastleGate warehouse shipping advice.
    * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
	* @param hasResponse Return only open or only acknowledged Warehouse Shipping Advices
	* @param fromDate The Warehouse Shipping Advice starting date period. Specifies the starting date from which to grab Warehouse Shipping Advices
	* @param wsaIds List of Castlegate WSA Id's for which to return associated Warehouse Shipping Advices.
	* @param sortOrder Order the result set by ascending or descending order of creationDate. 
    * @returns A list where each element is: A warehouse shipping advice
    */
    query_get_castle_gate_warehouse_shipping_advice = async (
        auth: { client_id: string, client_secret: string, base_url: string },        
        query: { __args: {limit?: number, hasResponse?: boolean, fromDate?: string, wsaIds?: string, sortOrder?: 'ASC' | 'DESC'} } & DeepReplace<WarehouseShippingAdvice>
    ): Promise<{data: { getCastleGateWarehouseShippingAdvice: WarehouseShippingAdvice[]}}> => ax(auth, {query: `{${jsonToGraphQLQuery({ getCastleGateWarehouseShippingAdvice: query})}}`})
    
	
    /**
    * Retrieves Dropship purchase orders.
    * @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
	* @param hasResponse The Purchase Order open status. Whether the purchase order is open.
	* @param fromDate The Purchase Order starting date period. Specifies the starting date from which to grab purchase orders.
	* @param poNumbers The list of Purchase Order numbers to return.
	* @param sortOrder Order the result set by ascending or descending order of poDate. 
    * @returns A list where each element is: A purchase order.
    */
    query_get_dropship_purchase_orders = async (
        auth: { client_id: string, client_secret: string, base_url: string },        
        query: { __args: {limit?: number, hasResponse?: boolean, fromDate?: string, poNumbers?: string, sortOrder?: 'ASC' | 'DESC'} } & DeepReplace<PurchaseOrder>
    ): Promise<{data: { getDropshipPurchaseOrders: PurchaseOrder[]}}> => ax(auth, {query: `{${jsonToGraphQLQuery({ getDropshipPurchaseOrders: query})}}`})
    
	
    /**
    * Fetches the current, authenticated Extranet user.
     
    * @returns A single Wayfair API user.
    */
    query_identity = async (
        auth: { client_id: string, client_secret: string, base_url: string },        
        query: { __args: {} } & DeepReplace<User>
    ): Promise<{data: { identity: User}}> => ax(auth, {query: `{${jsonToGraphQLQuery({ identity: query})}}`})
    
	
    /**
    * Loads information about inbound stock purchase order stats.
    * @param filters A list of filters to apply.
	* @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
	* @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
	* @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results. 
    * @returns A list where each element is: Stats for Inbound Stock Purchase Orders
    */
    query_inbound_stock_purchase_order_stats = async (
        auth: { client_id: string, client_secret: string, base_url: string },        
        query: { __args: {filters?: [field: 'id' | 'suId' | 'stockPurchaseOrderId' | 'containerNumber' | 'status' | 'serviceLevel' | 'totalUnits' | 'totalWholesale' | 'completedDate', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean], ordering?: [asc: string, desc: string], limit?: number, offset?: number} } & DeepReplace<InboundStockPurchaseOrderStat>
    ): Promise<{data: { inboundStockPurchaseOrderStats: InboundStockPurchaseOrderStat[]}}> => ax(auth, {query: `{${jsonToGraphQLQuery({ inboundStockPurchaseOrderStats: query})}}`})
    
	
    /**
    * Retrieves inventory data.
    * @param filters A list of filters to apply.
	* @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
	* @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
	* @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results. 
    * @returns A list where each element is: Fetches inventory data for the supplier/suppliers.
    */
    query_inventory = async (
        auth: { client_id: string, client_secret: string, base_url: string },        
        query: { __args: {filters?: [field: 'supplierPartNumber' | 'quantityOnHand' | 'quantityBackordered' | 'quantityOnOrder' | 'discontinued' | 'itemNextAvailabilityDate' | 'warehouseId', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean], ordering?: [asc: string, desc: string], limit?: number, offset?: number} } & DeepReplace<Inventory>
    ): Promise<{data: { inventory: Inventory[]}}> => ax(auth, {query: `{${jsonToGraphQLQuery({ inventory: query})}}`})
    
	
    /**
    * Load label generation events that occurred through the API
    * @param filters A list of filters to apply.
	* @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
	* @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
	* @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results. 
    * @returns A list where each element is: This type includes all the information that resulted from the generation of labels for a purchase order.
    */
    query_label_generation_events = async (
        auth: { client_id: string, client_secret: string, base_url: string },        
        query: { __args: {filters?: [field: 'id' | 'eventDate' | 'pickupDate' | 'poNumber', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean], ordering?: [asc: string, desc: string], limit?: number, offset?: number} } & DeepReplace<LabelGenerationEvent>
    ): Promise<{data: { labelGenerationEvents: LabelGenerationEvent[]}}> => ax(auth, {query: `{${jsonToGraphQLQuery({ labelGenerationEvents: query})}}`})
    
	
    /**
    * Fetches data for a Wayfair-initiated order cancellation.
    * @param filters A list of filters to apply.
	* @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
	* @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
	* @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results. 
    * @returns A list where each element is: Represents an order cancellation.
    */
    query_order_cancellations = async (
        auth: { client_id: string, client_secret: string, base_url: string },        
        query: { __args: {filters?: [field: 'id' | 'dateCreated', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean], ordering?: [asc: string, desc: string], limit?: number, offset?: number} } & DeepReplace<OrderCancellation>
    ): Promise<{data: { orderCancellations: OrderCancellation[]}}> => ax(auth, {query: `{${jsonToGraphQLQuery({ orderCancellations: query})}}`})
    
	
    /**
    * Load a catalog of products and their catalog information.
    * @param filters A list of filters to apply.
	* @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
	* @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
	* @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results. 
    * @returns A list where each element is: Information about a product that a specific supplier has provided.
    */
    query_parts = async (
        auth: { client_id: string, client_secret: string, base_url: string },        
        query: { __args: {filters?: [field: 'upc' | 'supplierPartNumber' | 'manufacturerModelNumber' | 'leadTime' | 'replacementPartLeadTime' | 'manufacturerPartId', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean], ordering?: [asc: string, desc: string], limit?: number, offset?: number} } & DeepReplace<Part>
    ): Promise<{data: { parts: Part[]}}> => ax(auth, {query: `{${jsonToGraphQLQuery({ parts: query})}}`})
    
	
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
    query_product_catalogs = async (
        auth: { client_id: string, client_secret: string, base_url: string },        
        query: { __args: {filters?: [field: 'supplierPartNumber' | 'manufacturerModelNumber' | 'manufacturerName' | 'upc' | 'supplierId' | 'productName' | 'collectionName' | 'wholesalePrice' | 'mapPrice' | 'fullRetailPrice' | 'minimumOrderQuantity' | 'forceMultiples' | 'displaySetQuantity' | 'manufacturerCountry' | 'harmonizedCode' | 'canadaCode' | 'leadTime' | 'leadTimeForReplacementParts' | 'sku' | 'skuStatus' | 'skuSubstatus' | 'whiteLabeled' | 'wayfairClass', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean], ordering?: [asc: string, desc: string], limit?: number, offset?: number} } & DeepReplace<Product>
    ): Promise<{data: { productCatalogs: Product[]}}> => ax(auth, {query: `{${jsonToGraphQLQuery({ productCatalogs: query})}}`})
    
	
    /**
    * Retrieves inventory data.
    * @param filters A list of filters to apply.
	* @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
	* @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
	* @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results. 
    * @returns A list where each element is: Fetches inventory data for the supplier/suppliers.
    */
    query_product_inventory = async (
        auth: { client_id: string, client_secret: string, base_url: string },        
        query: { __args: {filters?: [field: 'supplierPartNumber' | 'quantityOnHand' | 'quantityBackordered' | 'quantityOnOrder' | 'discontinued' | 'itemNextAvailabilityDate' | 'warehouseId', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean], ordering?: [asc: string, desc: string], limit?: number, offset?: number} } & DeepReplace<Inventory>
    ): Promise<{data: { productInventory: Inventory[]}}> => ax(auth, {query: `{${jsonToGraphQLQuery({ productInventory: query})}}`})
    
	
    /**
    * Retrieves purchase order errors.
    * @param filters A list of filters to apply.
	* @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
	* @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
	* @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results. 
    * @returns A list where each element is: Error information related to purchase orders
    */
    query_purchase_order_errors = async (
        auth: { client_id: string, client_secret: string, base_url: string },        
        query: { __args: {filters?: [field: 'supplierId' | 'poNumber', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean], ordering?: [asc: string, desc: string], limit?: number, offset?: number} } & DeepReplace<PurchaseOrderErrorConnection>
    ): Promise<{data: { purchaseOrderErrors: PurchaseOrderErrorConnection[]}}> => ax(auth, {query: `{${jsonToGraphQLQuery({ purchaseOrderErrors: query})}}`})
    
	
    /**
    * Retrieves purchase orders.
    * @param filters A list of filters to apply.
	* @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
	* @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
	* @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results.
	* @param dryRun Whether to query test purchase order data, or production purchase order data. Results of any dryRun purchase order mutations will only be exposed if this argument is true. 
    * @returns A list where each element is: A purchase order.
    */
    query_purchase_orders = async (
        auth: { client_id: string, client_secret: string, base_url: string },        
        query: { __args: {filters?: [field: 'id' | 'storePrefix' | 'poNumber' | 'poDate' | 'supplierId' | 'supplierName' | 'supplierAddress1' | 'supplierAddress2' | 'supplierAddress3' | 'supplierCity' | 'supplierState' | 'supplierPostalCode' | 'estimatedShipDate' | 'scheduledDeliveryDate' | 'deliveryMethodCode' | 'customerName' | 'customerAddress1' | 'customerAddress2' | 'customerCity' | 'customerState' | 'customerPostalCode' | 'customerCountry' | 'salesChannelName' | 'orderType' | 'packingSlipUrl' | 'open' | 'partNumber', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean], ordering?: [asc: string, desc: string], limit?: number, offset?: number, dryRun?: boolean} } & DeepReplace<PurchaseOrder>
    ): Promise<{data: { purchaseOrders: PurchaseOrder[]}}> => ax(auth, {query: `{${jsonToGraphQLQuery({ purchaseOrders: query})}}`})
    
	
    /**
    * Retrieves transaction information for long-running processes.
    * @param filters A list of filters to apply.
	* @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
	* @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
	* @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results. 
    * @returns A list where each element is: The status of a transaction made
    */
    query_transactions = async (
        auth: { client_id: string, client_secret: string, base_url: string },        
        query: { __args: {filters?: [field: 'id' | 'handle' | 'status' | 'submitted_at' | 'submittedAt' | 'completed_at' | 'completedAt' | 'itemCount' | 'errorCount' | 'completedCount' | 'processingCount', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean], ordering?: [asc: string, desc: string], limit?: number, offset?: number} } & DeepReplace<TransactionStatus>
    ): Promise<{data: { transactions: TransactionStatus[]}}> => ax(auth, {query: `{${jsonToGraphQLQuery({ transactions: query})}}`})
    
	
    /**
    * Shows upcoming scheduled UPS pickups.
    * @param filters A list of filters to apply.
	* @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
	* @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
	* @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results. 
    * @returns A list where each element is: Represents a scheduled UPS pickup event
    */
    query_ups_pickup_events = async (
        auth: { client_id: string, client_secret: string, base_url: string },        
        query: { __args: {filters?: [field: 'pickupReference' | 'dateOfPickup' | 'warehouseId', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean], ordering?: [asc: string, desc: string], limit?: number, offset?: number} } & DeepReplace<UPSPickupEvent>
    ): Promise<{data: { upsPickupEvents: UPSPickupEvent[]}}> => ax(auth, {query: `{${jsonToGraphQLQuery({ upsPickupEvents: query})}}`})
    
	
    /**
    * Retrieves Extranet users.
    * @param filters A list of filters to apply.
	* @param ordering A list of orderings to order the result set by. The first item in the list has the highest priority and the last has the least.
	* @param limit The maximum number of results to return. If a limit is set and the result set contains more items than the limit, then a subset of the results with a count equal to limit will be returned. If no limit is set, the default is 10.
	* @param offset The index of the result set to start at. If an offset is set all items at an index before the offset will be eliminated from the results. 
    * @returns A list where each element is: A single Wayfair API user.
    */
    query_users = async (
        auth: { client_id: string, client_secret: string, base_url: string },        
        query: { __args: {filters?: [field: 'id' | 'userType' | 'username' | 'firstName' | 'lastName' | 'email', conjunction: 'AND' | 'OR', equals: string, greaterThan: string, greaterThanOrEqualTo: string, lessThan: string, lessThanOrEqualTo: string, notEqualTo: string, In: string, notIn: string, isNull: boolean, greater_than: string, greater_than_or_equal_to: string, less_than: string, less_than_or_equal_to: string, not_equal_to: string, not_in: string, is_null: boolean], ordering?: [asc: string, desc: string], limit?: number, offset?: number} } & DeepReplace<User>
    ): Promise<{data: { users: User[]}}> => ax(auth, {query: `{${jsonToGraphQLQuery({ users: query})}}`})
    
	
    /**
    * Retrieves an instance of the SupplierVetting namespace.
     
    * @returns Querying Namespace object capable of running queries for supplier vetting.
    */
    query_workflow_vetting = async (
        auth: { client_id: string, client_secret: string, base_url: string },        
        query: { __args: {} } & DeepReplace<SupplierVetting>
    ): Promise<{data: { workflowVetting: SupplierVetting}}> => ax(auth, {query: `{${jsonToGraphQLQuery({ workflowVetting: query})}}`})
    
    
    /**
    * Retrieves an instance of ApplicationMutator with which to run application mutations.
     
    * @returns Mutator object capable of running mutations on applications.
    */
    mutate_applications = async (
        auth: { client_id: string, client_secret: string, base_url: string },
        mutation: {__args: ApplicationMutator } & DeepReplace<ApplicationMutator>
    ): Promise<ApplicationMutator> => ax(auth, {mutation: `{${jsonToGraphQLQuery({ applications: mutation})}}`})
    
	
    /**
    * The Type containing all the mutations for catalog projects.
     
    * @returns Mutator object capable of running mutations on catalog projects.
    */
    mutate_catalog_projects = async (
        auth: { client_id: string, client_secret: string, base_url: string },
        mutation: {__args: CatalogProjectMutator } & DeepReplace<CatalogProjectMutator>
    ): Promise<CatalogProjectMutator> => ax(auth, {mutation: `{${jsonToGraphQLQuery({ catalogProjects: mutation})}}`})
    
	
    /**
    * The Type containing all mutations for inventory.

Click into a mutation below to see an example of the that mutation.
     
    * @returns Mutator object capable of running mutations on inventory.
    */
    mutate_inventory = async (
        auth: { client_id: string, client_secret: string, base_url: string },
        mutation: {__args: InventoryMutator } & DeepReplace<InventoryMutator>
    ): Promise<InventoryMutator> => ax(auth, {mutation: `{${jsonToGraphQLQuery({ inventory: mutation})}}`})
    
	
    /**
    * The Type containing all mutations for inventory.

Click into a mutation below to see an example of the that mutation.
     
    * @returns Mutator object capable of running mutations on inventory.
    */
    mutate_product_inventory = async (
        auth: { client_id: string, client_secret: string, base_url: string },
        mutation: {__args: InventoryMutator } & DeepReplace<InventoryMutator>
    ): Promise<InventoryMutator> => ax(auth, {mutation: `{${jsonToGraphQLQuery({ productInventory: mutation})}}`})
    
	
    /**
    * Retrieves an instance of PurchaseOrderMutator to run purchase order mutations with.
     
    * @returns Mutator object capable of running mutations on purchase orders.

NOTE: Purchase order mutations are under active development and should be considered as an Alpha release.
    */
    mutate_purchase_orders = async (
        auth: { client_id: string, client_secret: string, base_url: string },
        mutation: {__args: PurchaseOrderMutator } & DeepReplace<PurchaseOrderMutator>
    ): Promise<PurchaseOrderMutator> => ax(auth, {mutation: `{${jsonToGraphQLQuery({ purchaseOrders: mutation})}}`})
    
}
export const wayfair = new Wayfair()