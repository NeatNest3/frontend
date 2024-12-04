export const users = [
  {
    id: 1,
    first_name: "Jane",
    last_name: "Doe",
    phone: "123-456-7890",
    email: "BookNerd3@gmail.com",
    dob: "January 2, 1973",
    role: {
      type: "Customer",
      details: {
        id: 1,
        bio: "Avid book lover and aspiring writer. Always looking for the next great read!",
        profile_pic: "https://via.placeholder.com/150",
      },
    },
    homes: [
      {
        id: 1,
        customerId: 1,
        homeName: "Elm Street House",
        address: "123 Elm St",
        city: "Springfield",
        state: "IL",
        zip: "62704",
        homeType: "Home",
        outdoorPicture: "https://via.placeholder.com/150",
        pets: [
          {
            type: "Dog",
            amount: 2,
          },
          {
            type: "Cat",
            amount: 1,
          },
        ],
      },
      {
        id: 2,
        customerId: 1,
        homeName: "City Apartment",
        address: "456 Oak Ave",
        city: "Chicago",
        state: "IL",
        zip: "60601",
        homeType: "Apartment",
        outdoorPicture: "https://via.placeholder.com/150",
        pets: [
          {
            type: "Bird",
            amount: 2,
          },
          {
            type: "Cat",
            amount: 2,
          },
        ],
      },
    ],
  },
];


export const activeClean = [
  {
    id: 1,
    customerId: 1,
    cleaner: {
      id: 2,
      first_name: "John",
      last_name: "Smith",
      phone: "123-456-7890",
      email: "Bookcleaner@gmail.com",
    },
    home: {

      id: 1,
      homeName: "Elm Street House",
      address_line_one: "123 Elm St",
      city: "Springfield",
      state: "IL",
      zipcode: "62704",
      outdoorPicture: "https://via.placeholder.com/150",
    },
    date: "12-10", 
    time: "2:00pm",
    rooms: [
      {
        name: "Living Room",
        services: [
          { 
            name: "Vacuum", 
            description: null 
          },
          { 
            name: "Dust", 
            specifications: "by the television" 
          },
        ],
      },
      {
        roomName: "Kitchen",
        tasks: [
          {
            taskName: "Clean counters",
            specifications: "use bleach free spray under sink",
          },
          { taskName: "Wash dishes", specifications: null },
        ],
      },
    ],
    status: "active", 
  },
  {
    id: 2,
    customerId: 1,
    cleaner: {
      id: 3,
      first_name: "Alice",
      last_name: "Johnson",
      phone: "123-456-7890",
      email: "Bookit@yahoo.com",
    },
    home: {
      id: 2,
      homeName: "City Apartment",
      address: "456 Oak Ave",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      outdoorPicture: "https://via.placeholder.com/150",
    },
    date: "12-12", 
    time: "10:00am",
    rooms: [
      {
        roomName: "Bedroom",
        tasks: [
          { taskName: "Change sheets", specifications: null },
          {
            taskName: "Organize closet",
            specifications: "shoes on top shelf please",
          },
        ],
      },
    ],
    status: "in progress", 
  },

  {
    id: 3,
    customerId: 2,
    cleaner: {
      id: 4,
      first_name: "Eva",
      last_name: "Miller",
      phone: "987-654-3210",
      email: "eva.miller@cleaners.com",
    },
    home: {
      id: 3,
      homeName: "Lakeview Villa",
      address: "789 Lakeview Rd",
      city: "Lakeside",
      state: "MI",
      zip: "49001",
      outdoorPicture: "https://via.placeholder.com/150",
    },
    date: "11-28", 
    time: "3:00pm",
    rooms: [
      {
        roomName: "Living Room",
        tasks: [
          { taskName: "Vacuum", specifications: "under the couch" },
          { taskName: "Dust", specifications: "on shelves" },
        ],
      },
      {
        roomName: "Bathroom",
        tasks: [
          { taskName: "Clean sink", specifications: null },
          { taskName: "Wipe mirrors", specifications: null },
        ],
      },
    ],
    status: "complete", 
  },

  {
    id: 4,
    customerId: 3,
    cleaner: {
      id: 5,
      first_name: "Brian",
      last_name: "Garcia",
      phone: "555-123-9876",
      email: "brian.garcia@cleaners.com",
    },
    home: {
      id: 4,
      homeName: "Downtown Loft",
      address: "1010 Market St",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      outdoorPicture: "https://via.placeholder.com/150",
    },
    date: "12-01", 
    time: "1:00pm",
    rooms: [
      {
        roomName: "Bedroom",
        tasks: [
          { taskName: "Change sheets", specifications: null },
          { taskName: "Vacuum", specifications: "under bed" },
        ],
      },
      {
        roomName: "Kitchen",
        tasks: [
          { taskName: "Clean countertops", specifications: null },
          { taskName: "Wipe down appliances", specifications: null },
        ],
      },
    ],
    status: "complete", 
  },
];
