# Wine API
# 
# W2D4: Wine API
#####   Rendering information and HTTP methods 
# 
# UI

![UI](./UI/wine-list.png)
# 
![UI](./UI/wine-form.png)

# 
### Features: 
#### Wine list data is retrieved, created and deleted using an API to remote service.
#### Axios is used to implement AJAX query
#### React Router is used to link to the wine form component. The main App component renders the 8 existing wine products and brief info (wine list). 
#### When the image of a product is clicked, the wine form component is rendered. It has a wine image on the right and a form on the left. The wine form has the details about the wine product.
#### The Delete button underneath the wine image allows user to delete a wine product.
#### The Create button underneath the form allows user to reuse the existing wine product info to create another product by editing some of the fields.
# 
####  All API requests are made from the App component (wine list). Call backs are used to update wine product info.
#####    Axios GET is used to retrieve wine list.
#####    Axios POST is used to create new wine product record.
#####    Axios DELETE is used to delete the wine product.  
#####    React Router is used to link to the WineForm component.
#####    React Redirect is used to navigate back to the wine list when the user create or delete a wine product.
#####    JSON strings are used to pass wine object between App Component and WineForm component.
#####    A confirm dialogue box prompts for OK/Cancel decision from user. If the user cancels the action, the wine form remains. 
