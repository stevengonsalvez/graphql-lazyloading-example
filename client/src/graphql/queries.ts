import { gql } from '@apollo/client';

// Main home page query using @defer and @stream directives for lazy loading
export const HOME_PAGE_QUERY = gql`
  query HomePageQuery {
    currentUser {
      id
      name
      phoneNumber
      loyaltyPoints
      ... @defer {
        billInformation {
          amount
          dueDate
          isPaid
          unlimitedData
          historyDetails {
            date
            amount
            status
          }
        }
      }
      ... @stream {
        accountUpdates {
          id
          type
          message
          date
          isRead
        }
      }
      ... @defer {
        recommendations {
          id
          title
          description
          imageUrl
          actionUrl
        }
      }
    }
    
    ... @stream {
      topTasks {
        id
        title
        description
        actionUrl
        iconType
      }
    }
    
    ... @stream {
      promotions {
        id
        title
        description
        imageUrl
        actionUrl
        ... @defer {
          details {
            termsAndConditions
            validUntil
            eligibility
            ... @stream {
              benefits
            }
          }
        }
      }
    }
    
    ... @stream {
      categories {
        id
        name
        iconUrl
      }
    }
    
    ... @stream {
      discoverItems {
        id
        title
        description
        imageUrl
        price
        actionUrl
        type
        ... @defer {
          additionalInfo
        }
      }
    }
  }
`;

// Query for product categories with products streamed
export const CATEGORY_WITH_PRODUCTS_QUERY = gql`
  query CategoryWithProductsQuery($categoryId: ID!) {
    ... @stream {
      categories {
        id
        name
        iconUrl
        ... @stream {
          products {
            id
            name
            description
            imageUrl
            price
            ... @defer {
              details {
                ... @stream {
                  specifications {
                    name
                    value
                  }
                }
                ... @stream {
                  reviews {
                    id
                    author
                    rating
                    comment
                    date
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Query for user devices with deferred technical details
export const USER_DEVICES_QUERY = gql`
  query UserDevicesQuery {
    ... @stream {
      userDevices {
        id
        name
        type
        imageUrl
        ... @defer {
          technicalDetails {
            serialNumber
            model
            purchaseDate
            warrantyEnd
            ... @stream {
              supportOptions
            }
          }
        }
      }
    }
  }
`;

// Search query with streamed results
export const SEARCH_QUERY = gql`
  query SearchQuery($query: String!) {
    search(query: $query) {
      ... @stream {
        devices {
          id
          name
          type
          imageUrl
        }
      }
      ... @stream {
        plans {
          id
          name
          description
          price
        }
      }
      ... @stream {
        accessories {
          id
          name
          description
          price
        }
      }
      ... @stream {
        helpArticles {
          id
          title
          summary
          url
          ... @defer {
            fullContent
          }
        }
      }
    }
  }
`;

// Single query for the POC with progressive loading using @defer
export const USER_BILL_QUERY = gql`
  query UserBillQuery {
    # User info loads first (immediately)
    currentUser {
      id
      name
      phoneNumber
      
      # Bill information loads second (deferred)
      ... @defer(label: "billInformation") {
        billInformation {
          amount
          dueDate
          isPaid
          unlimitedData
          
          # Bill history loads last (nested deferred)
          ... @defer(label: "billHistory") {
            historyDetails {
              date
              amount
              status
            }
          }
        }
      }
    }
  }
`;
