import ServerApp from './server_app';

//=============================================
// Port number for when the application is running
const PORT = process.env.PORT || 3000;

//Run the application on PORT, 3000.
ServerApp.listen(PORT, () => console.log('The port, ' + PORT + ' is running'));
