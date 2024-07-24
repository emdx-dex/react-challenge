# Challenge: Senior ReactJS Developer

## Part 1: Pixel Perfect Component Implementation

### Objective

Create a pixel-perfect controlled input component based on the provided PDF design guidelines. This component should be implemented in a Storybook and deployed for browser access.

### Requirements

1. **Storybook Setup**
   - Mount the component into a Storybook page.
   - Deploy the Storybook to be accessible via a browser.

2. **Controlled Input Component**
   - The component should be a controlled input.
   - The API must allow developers to send options and retrieve values.
   - Handle single and multi-selection modes.

3. **States Management**
   - Implement disabled and error states.
   - Provide context about decisions made and chosen approach.

4. **Styling**
   - Follow the pixel-perfect design as specified in the PDF.
   - Use plain CSS, styled components, Tailwind, or any other preferred method for managing styles.

5. **Code Quality**
   - Ensure the component has clean and readable code.
   - Maintain a high standard of code quality and best practices.

### Design Guidelines

- **Select Box**
  - Background: #ffffff
  - Border: 1px #888888
  - Border radius: 4px
  - Padding left/right: 12px
  - Padding top/bottom: 7px
  - Height: 32px
  - Width: 252px
  - Font face: Open Sans Regular
  - Font size: 12px
  - Line height: 16px
  - Color: #888888

- **Caret**
  - Width: 12px
  - Height: 8px
  - Color: #888888
  - Padding top/bottom: 11px

- **Menu Box**
  - Background: #cccccc
  - Border: 1px #222222
  - Border radius: 4px
  - Width: 100%
  - Height: 32px

- **Menu Item**
  - Background: #ffffff
  - Color: #222222
  - Font face: Open Sans Regular
  - Font size: 12px
  - Line height: 16px

### Submission Guidelines

- Fork this Repo
- Complete the component and commit your code.
- Submit a pull request with a detailed README explaining your approach, decisions made, and instructions on how to run the component in Storybook.
- Ensure your code is well-documented and follows best practices.

---

## Part 2: Real-Time Crypto Price Tracker

### Objective

Develop a ReactJS application that tracks real-time cryptocurrency prices using WebSockets and manages state with Redux.

### Requirements

1. **Project Setup**
   - Initialize a new ReactJS project.
   - Set up Redux for state management.
   - Configure WebSocket connection for real-time data.

2. **Real-Time Data Integration**
   - Connect to a public cryptocurrency WebSocket API to receive real-time price updates.
   - Display a list of selected cryptocurrencies and their current prices.
   - Ensure the UI updates in real-time as new data is received.

3. **State Management with Redux**
   - Use Redux to manage the state of the application.
   - Store real-time data in the Redux store.
   - Implement actions and reducers to handle incoming data and update the state accordingly.

4. **UI Design**
   - Create a user-friendly interface to display the real-time prices.
   - Include features to add/remove cryptocurrencies from the list.
   - Ensure the application is responsive and works well on different devices and screen sizes.

5. **Performance Optimization**
   - Ensure the application is performant and can handle frequent updates without lag.
   - Optimize components to re-render efficiently.

6. **Error Handling**
   - Implement error handling for WebSocket connection issues and data fetching errors.
   - Display appropriate error messages to the user.

### Submission Guidelines

- Fork the Repo
- Complete the project and commit your code.
- Submit a pull request with a detailed README explaining your approach, any challenges faced, and instructions on how to run the application.
- Ensure your code is well-documented and follows best practices.

#### Bonus points

- Add Dockerfile recipe to seamless run the application using Docker runtime.

##### Misc

Free API/WS endpoints can be found here: https://www.okx.com/okx-api