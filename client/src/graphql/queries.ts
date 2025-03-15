import { gql } from '@apollo/client';

// Main home page query using @defer and @stream directives for lazy loading
export const HOME_PAGE_QUERY = gql`
  query HomePageQuery {
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
        historyDetails @defer {
          date
          amount
          status
        }
      }
      accountUpdates @stream {
        id
        type
        message
        date
        isRead
      }
      recommendations @defer {
        id
        title
        description
        imageUrl
        actionUrl
      }
    }
    
    topTasks @stream {
      id
      title
      description
      actionUrl
      iconType
    }
    
    promotions @stream {
      id
      title
      description
      imageUrl
      actionUrl
      details @defer {
        termsAndConditions
        validUntil
        eligibility
        benefits @stream
      }
    }
    
    categories @stream {
      id
      name
      iconUrl
    }
    
    discoverItems @stream {
      id
      title
      description
      imageUrl
      price
      actionUrl
      type
      additionalInfo @defer
    }
  }
`;

// Query for product categories with products streamed
export const CATEGORY_WITH_PRODUCTS_QUERY = gql`
  query CategoryWithProductsQuery($categoryId: ID!) {
    categories @stream {
      id
      name
      iconUrl
      products @stream(if: true) {
        id
        name
        description
        imageUrl
        price
        details @defer {
          specifications @stream {
            name
            value
          }
          reviews @stream {
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
`;

// Query for user devices with deferred technical details
export const USER_DEVICES_QUERY = gql`
  query UserDevicesQuery {
    userDevices @stream {
      id
      name
      type
      imageUrl
      technicalDetails @defer {
        serialNumber
        model
        purchaseDate
        warrantyEnd
        supportOptions @stream
      }
    }
  }
`;

// Search query with streamed results
export const SEARCH_QUERY = gql`
  query SearchQuery($query: String!) {
    search(query: $query) {
      devices @stream {
        id
        name
        type
        imageUrl
      }
      plans @stream {
        id
        name
        description
        price
      }
      accessories @stream {
        id
        name
        description
        price
      }
      helpArticles @stream {
        id
        title
        summary
        url
        fullContent @defer
      }
    }
  }
`;
