
import {  gql } from "@apollo/client"




export const MOST_VIEWED = gql`query Query {
    mostViewed {
        title
        user
        views
        date
        id
      }
  }`
   
 export const MOST_LIKED = gql`query Query {
    mostLiked {
        title
        user
        id
        date
        likes
        views
    }}`    

 export const ALL_COMMENTS = gql`query AllComments($userid: String!) {
    allComments(userid: $userid) {
      body
      date
      id
      note
      user
      noteId
    }
  }`    