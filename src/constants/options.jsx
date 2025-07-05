export const SelectTravelList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveller in exploration",
    icon: "✈",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travellers in tandem.",
    icon: "🥂",
    people: "2 people",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adventure.",
    icon: "🏡",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill seekers.",
    icon: "⛵",
    people: "5 to 10 people",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs.",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side.",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "No worries about cost.",
    icon: "💸",
  }
];

export const AI_PROMPT = `Generate a travel itinerary plan in **valid JSON** format only. 
The plan is for a trip to: {location} for {totalDays} days, for {travellers} people, with a budget of {budget}. 
Respond ONLY in JSON. Do not include explanation or comments.There should be multiple options for hotels given.(atleast 5-6)

The response JSON should include:

{
  "hotels": [
    {
      "hotelName": "",
      "address": "",
      "price": "",
      "imageUrl": "",
      "geoCoordinates": { "lat": 0.0, "lng": 0.0 },
      "rating": 4.5,
      "description": ""
    },
    ...
  ],
  "itinerary": [
    {
      "day": 1,
      "places": [
        {
          "placeName": "",
          "details": "",
          "imageUrl": "",
          "geoCoordinates": { "lat": 0.0, "lng": 0.0 },
          "ticketPricing": "",
          "bestTimeToVisit": "",
          "travelTime": ""
        }
      ]
    },
    ...
  ]
}
Ensure the JSON is well-formatted and parsable directly.`
