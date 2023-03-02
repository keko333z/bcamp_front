
import { gql } from "@apollo/client"


/*export const DELETE_COMMENT= gql`mutation DeleteComment($deleteCommentId: String!) {
    deleteComment(id: $deleteCommentId) {
      id
      body
      note
    }
}`*/

export const DELETE_COMMENT= gql`mutation Mutation($cid: String!) {
    deleteComment(id: $cid) {
      id
      body
      note
    }
  }`