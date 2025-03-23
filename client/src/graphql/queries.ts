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

// Non-lazy loading version of the same query without @defer and @stream directives
export const USER_BILL_QUERY_EAGER = gql`
  query UserBillQueryEager {
    # All data loads at once
    currentUser {
      id
      name
      phoneNumber
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
  }
`;

// Non-lazy loading version of the home page query without @defer and @stream directives
export const HOME_PAGE_QUERY_EAGER = gql`
  query HomePageQueryEager {
    currentUser {
      id
      name
      phoneNumber
      loyaltyPoints
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
      accountUpdates {
        id
        type
        message
        date
        isRead
      }
      recommendations {
        id
        title
        description
        imageUrl
        actionUrl
      }
    }
    
    topTasks {
      id
      title
      description
      actionUrl
      iconType
    }
    
    promotions {
      id
      title
      description
      imageUrl
      actionUrl
      details {
        termsAndConditions
        validUntil
        eligibility
        benefits
      }
    }
    
    categories {
      id
      name
      iconUrl
    }
    
    discoverItems {
      id
      title
      description
      imageUrl
      price
      actionUrl
      type
      additionalInfo
    }
  }
`;

// Mobile App Queries - for lazy loading implementation
export const MOBILE_APP_QUERY_LAZY = gql`
  query MobileAppQueryLazy {
    # User basic info loads immediately
    currentUser {
      id
      name
      phoneNumber
      accountNumber
      
      # Mobile details base info loads with small delay
      ... @defer(label: "mobileDetails") {
        mobileDetails {
          planName
          contractTerm {
            startDate
            endDate
          }
          hasUnlimitedData
          deviceName
          discount {
            type
            percentage
          }
          monthlyPrice
          originalPrice
          phoneNumber
          
          # Data usage info loads with medium delay
          ... @defer(label: "dataUsageInfo") {
            dataUsage
            dataLimit
          }
          
          # Billing info loads with longer delay
          ... @defer(label: "billingInfo") {
            billAmount
            debitDate
          }
        }
      }
    }
  }
`;

// Mobile App Queries - for eager loading implementation (no defer)
export const MOBILE_APP_QUERY_EAGER = gql`
  query MobileAppQueryEager {
    # All data loads at once
    currentUser {
      id
      name
      phoneNumber
      accountNumber
      mobileDetails {
        billAmount
        debitDate
        planName
        contractTerm {
          startDate
          endDate
        }
        hasUnlimitedData
        deviceName
        discount {
          type
          percentage
        }
        monthlyPrice
        originalPrice
        phoneNumber
        dataUsage
        dataLimit
      }
    }
  }
`;
