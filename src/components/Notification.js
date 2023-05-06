
const notificationMessage = {
    color: "red",
    borderRadius: 3,
    float: "left",
    padding: "10px"
  }
  export const Notification = ({message}) => {
    return  <div style={notificationMessage}>{message}</div>
         
  }