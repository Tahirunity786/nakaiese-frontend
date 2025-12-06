import { useState } from "react";
import { useRouter } from "@/i18n/routing"; 
import { buildSearchQuery } from "@/services/queryService";

export const useSearchForm = () => {
  const router = useRouter();

  // 1. Add Service Type State ('hotels' is default)
  const [serviceType, setServiceType] = useState('hotels'); 

  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState([null, null]); // For Hotels
  const [singleDate, setSingleDate] = useState(new Date()); // For Restaurants
  
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1, // Only for hotels
    people: 2, // Only for restaurants
    pets: false,
  });

  const handleGuestChange = (type, operation) => {
    setGuests((prev) => {
      const newValue = operation === "inc" ? prev[type] + 1 : prev[type] - 1;
      
      // Basic Validation
      if (newValue < 0) return prev; 
      if ((type === "adults" || type === "people") && newValue < 1) return prev;
      
      return { ...prev, [type]: newValue };
    });
  };

  const handleSearch = () => {
    if (!destination) {
      alert("Please select a destination");
      return;
    }

    // 2. Logic Split based on Service Type
    let query = {};
    
    if (serviceType === 'hotels') {
      // Hotel Logic: Uses Date Range + Rooms
      query = buildSearchQuery(destination, dateRange, guests);
    } else {
      // Restaurant Logic: Uses Single Date + People count
      query = {
        city: destination,
        date: singleDate ? singleDate.toISOString().split('T')[0] : undefined,
        party_size: guests.people
      };
    }

    // 3. Dynamic Routing
    router.push({
      pathname: `/${serviceType}`, // Goes to /hotels or /restaurants
      query: query,
    });
  };

  return {
    serviceType,
    setServiceType,
    destination,
    setDestination,
    dateRange,
    setDateRange,
    singleDate,
    setSingleDate,
    guests,
    handleGuestChange,
    handleSearch,
  };
};