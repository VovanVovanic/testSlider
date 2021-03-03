
Clone the project first. 

To get all dependencies, type in console npm i

To start, type npm start and enjoy

By default slider uses the array of images randomly found in internet, however, you can use you own folder with images
Just use function importAllImages at the top of App component. 
importAllImages(require.context(`your path to images folder`, false, /\.(png|jpe?g|svg)$/))
