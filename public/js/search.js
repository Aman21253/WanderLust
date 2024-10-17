function searchListings() {
    // Get the search query and convert it to lowercase for case-insensitive search
    const query = document.getElementById("searchInput").value.toLowerCase();
  
    // Filter listings based on the search query
    const filteredListings = sampleListings.filter(listing => {
      return (
        listing.title.toLowerCase().includes(query) ||
        listing.location.toLowerCase().includes(query) ||
        listing.country.toLowerCase().includes(query) ||
        listing.description.toLowerCase().includes(query)
      );
    });
  
    // Display the filtered results
    displayListings(filteredListings);
  }
  
  function displayListings(listings) {
    const listingsContainer = document.getElementById("listingsContainer");
    listingsContainer.innerHTML = ""; // Clear previous listings
  
    listings.forEach(listing => {
      const listingElement = document.createElement("div");
      listingElement.classList.add("listing");
  
      listingElement.innerHTML = `
        <h3>${listing.title}</h3>
        <p>${listing.description}</p>
        <img src="${listing.image.url}" alt="${listing.title}" />
        <p>Location: ${listing.location}, ${listing.country}</p>
        <p>Price: $${listing.price}</p>
      `;
  
      listingsContainer.appendChild(listingElement);
    });
  }