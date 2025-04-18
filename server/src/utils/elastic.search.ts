import { client } from "#src/services/elastic.search.service.js";
import { TypeProduct } from "#src/types/Product.js";

export async function insertToElasticSearch(product: TypeProduct) {
    try {
        const {
            id,
            brand,
            title,
            isApproved,
            isAvailable,
            type,
            description,
            year,
            ps,
            pricePerDay,
            color,
            photoUrls,
            rentStart,
            rentEnd
        } = product;

        await client.index({
            index: "products",
            id: id.toString(),
            document: {
                brand,
                title,
                pricePerDay,
                type,
                description,
                isApproved,
                isAvailable,
                year,
                ps,
                color,
                photoUrls,
                rentStart,
                rentEnd
            }
        });
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function searchProducts(query: any): Promise<any> {
    const filters: any[] = [
        { term: { isApproved: true } }
    ];

    const multiFields = [
        "brand",
        "model",
        "subtype",
        "fuel_system",
        "transmission",
        "drive_system",
        "color",
        "features",
        "type"
    ];

    for (const field of multiFields) {
        const values = query[field]
            ? Array.isArray(query[field])
                ? query[field]
                : [query[field]]
            : [];

        if (values.length === 1) {
            filters.push({ term: { [field]: values[0] } });
        } else if (values.length > 1) {
            filters.push({ terms: { [field]: values } });
        }
    }

    if (query.seats) {
        const seats = query.seats.split(",").map(Number).filter(Boolean);
        if (seats.length === 1) {
            filters.push({ term: { seats: seats[0] } });
        } else if (seats.length > 1) {
            filters.push({ terms: { seats } });
        }
    }

    const ranges = {
        price: query.price ? query.price.split(",").map(Number) : [],
        production_year: query.production_year ? query.production_year.split(",").map(Number) : [],
        engine_power: query.engine_power ? query.engine_power.split(",").map(Number) : []
    };

    for (const [field, arr] of Object.entries(ranges)) {
        if (arr.length === 2) {
            filters.push({
                range: {
                    [field]: {
                        gte: arr[0],
                        lte: arr[1]
                    }
                }
            });
        }
    }

    if (query.datetime_after || query.datetime_before) {
        filters.push({
            range: {
                availability: {
                    ...(query.datetime_after && { gte: query.datetime_after }),
                    ...(query.datetime_before && { lte: query.datetime_before })
                }
            }
        });
    }

    const page = Number(query.page) || 1;
    const size = 20;
    const from = (page - 1) * size;

    const sort = query.order_by ? [{ [query.order_by]: "asc" }] : [];

    const body = {
        from,
        size,
        sort,
        query: {
            bool: {
                filter: filters
            }
        }
    };

    const result = await client.search({
        index: "products",
        body
    });

    return result.hits.hits.map((hit: any) => hit._source);
}
