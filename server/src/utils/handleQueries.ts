const constructObjectQueries = (queries: any) => {
  const {
    starRating,
    hotelType,
    facilities,
    maxPrice,
    destination,
    adultCount,
    childCount,
  } = queries;

  const objectQuery: any = {};

  // Star Rating
  if (starRating) {
    objectQuery.starRating = {
      $in: starRating.split("-").map((star: string) => parseInt(star)),
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
      $in: hotelType.split("-").map((type: string) => type),
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

const constructSorting = ({ sort }: any) => {
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
  }

  return sortOptions;
};

export { constructObjectQueries, constructSorting };
