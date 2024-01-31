"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructSorting = exports.constructObjectQueries = void 0;
const constructObjectQueries = (queries) => {
    const { starRating, hotelType, facilities, maxPrice, destination, adultCount, childCount, } = queries;
    const objectQuery = {};
    // Star Rating
    if (starRating) {
        objectQuery.starRating = {
            $in: starRating.split("-").map((star) => parseInt(star)),
        };
    }
    // Adult Count
    if (adultCount) {
        objectQuery.adultCount = {
            $gte: parseInt(adultCount),
        };
    }
    // Child Count
    if (childCount) {
        objectQuery.pricePerNight = {
            $gte: childCount(childCount),
        };
    }
    // Max Price
    if (maxPrice) {
        objectQuery.pricePerNight = {
            $lte: parseInt(maxPrice),
        };
    }
    // Hotel Type
    if (hotelType) {
        objectQuery.type = {
            $in: hotelType.split("-").map((type) => type),
        };
    }
    if (facilities) {
        objectQuery.facilities = {
            $all: facilities.split("-"),
        };
    }
    // Destination
    if (destination) {
        objectQuery.$or = [
            { city: new RegExp(destination, "i") },
            { country: new RegExp(destination, "i") },
        ];
    }
    return objectQuery;
};
exports.constructObjectQueries = constructObjectQueries;
const constructSorting = ({ sort }) => {
    let sortOptions = {};
    switch (sort) {
        case "starRating":
            sortOptions = { starRating: -1 };
            break;
        case "pricePerNightAsc":
            sortOptions = { pricePerNight: 1 };
            break;
        case "pricePerNightDesc":
            sortOptions = { pricePerNight: -1 };
            break;
        default:
            sortOptions = { createdAt: -1 };
    }
    return sortOptions;
};
exports.constructSorting = constructSorting;
//# sourceMappingURL=handleQueries.js.map