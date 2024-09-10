# Contacts management small web application task
It is a description sent to me from [Axis](https://axisapp.com/) Company. It concerns organizing and facilitating the display of contacts, as outlined in the requirements. The first and second stories relate to displaying and filtering contacts based on the first letter of the Latin alphabet and viewing details of individual contacts.
The third story involves CRUD operations and search functionality using Redux Toolkit. Therefore, I divided the work file into modules to align with the requirements.
One module is dedicated to contacts, which comes through the API endpoints for contacts management and displays detailed information with filtering based on Latin letters. It also allows navigation to individual contact details, all within a single module named `ContactList`.
The other module is for CRUD operations and search functionality, so it was named `CreateContact`. I did this to simplify task management, with a flag indicating the specific story for each task. All of this is within a small, responsive dashboard compatible with all screen sizes.


# Install & Run
  - You can view it live as it is already uploaded on vercel.
     - The link is: [[provide_link_here](https://contacts-management-client-web.vercel.app/)].
  - In the case of running it locally, the process is as follows:
     - npm i
     - npm run dev 
     - Open [http://localhost:4000](http://localhost:4000) to view it in your browser.


 # How to use
   - Go to the `ContactList` tab.
     - List all contacts with scrolling and pagination when scrolling.
     - Filter contacts by each letter of the alphabet.
   - Go to the `CreateContact` tab:
     - You can create a new contact with `img`, `name`, `email`, and `phonenumber`.
     - You can edit an existing contact with `img`, `name`, `email`, and `phonenumber`.
     - You can delete a contact.
     - You can view any contact created, and if the list is large, you can search by name.


# Libraries & Technologies Used
 ###  Main Stack
 -  [React + TypeScript + Vite ](https://vitejs.dev/guide/) The core stack used for building the project. To set up the project, run: `npm create vite@latest`
 ###  Styling 
 -  [Tailwind CSS: ](https://tailwindcss.com/): Used for efficient and responsive styling.
 -  [Shadcn UI](https://ui.shadcn.com/): A library built with Tailwind CSS, used for creating the main UI components.
 -  [Framer Motion](https://www.framer.com/motion/ ): Used for animations and enhancing front-end interactivity.
 -  [React Icons:](https://react-icons.github.io/react-icons/ ): Used to integrate icons throughout the front-end.
 ###  Form and Validation
 -  [React hook rotm ](https://www.react-hook-form.com/): Used for creating and managing the contact form, as well as handling form edits.
 -  [Yup](https://github.com/jquense/yup/tree/pre-v1): ntegrated with React Hook Form to provide schema-based validation for the forms.
  ###  etching API and Listing Data
 -  [axios ](https://axios-http.com/docs/intro): A library used for making HTTP requests to fetch contact data.
 -  [SWR ](https://swr.vercel.app/): Used for data fetching, handling loading states, errors, and caching API calls with a unique key for each request.
 -  [react-infinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component): Helps with implementing pagination while scrolling through the contact list.
 -  [randomuser](https://randomuser.me/): An API used to generate random contact data for the application.
  ###  Global State Management
 -  [redux toolkit ](https://redux-toolkit.js.org/): Utilized for managing CRUD operations in Story 3 of the task.
  ###  Code Formatting
 -  [eslint](https://vercel.com/ ): Used to maintain code quality and ensure consistent formatting across the project.
 -  [prettier](https://vercel.com/ ): A code formatter used to automatically clean up and style the code.
 ###   Deployment
 -  [vercel.app ](https://vercel.com/ ): The platform used to deploy the project live on the web.


## Some issue in  `https://randomuser.me/`  and how am resolved 
##  First 
While using the `https://randomuser.me/` API, I noticed the response lacked a total count of available data, which made implementing infinite scroll difficult. The `info` section of the response looked like this:
``` jason
 "info": {
    "seed": "56d27f4a53bd5441",
    "results": 1,
    "page": 1,
    "version": "1.4"
  }
```
### `Solution`:
To handle this, I used `react-infinite-scroll-component`. It allows data to be loaded as the user scrolls without needing a total count. Pagination from the API (`page` field) helps request the next set of data, ensuring smooth scrolling and performance.
##  Second 
In many cases, the `ID`field for a contact is missing in the API response from` https://randomuser.me/`. A typical response might look like this:
``` jason
"id": {
        "name": "SSN",
        "value": "405-88-3636"
      }, 
```
However, some contacts may not have an ID, which leads to a bad user experience when trying to view the details of that contact.
### `Solution`:
I implemented a workaround by first checking if the contact has an ID before navigating to the details page. If not, an error message is shown using a toast notification
``` js
const handelNavigate = () => {
  if (contactId) {
    navigate(generatePath(ROUTES.CONTACT_DETAILS, { contactId }));
  } else {
    toast.error('Oops, this contact does not have an ID to view details. Please try another contact.');
  }
};
```
Additionally, I filtered out any contacts without an ID from being displayed to avoid confusion:

``` js
const filteredContacts = selectedLetter
  ? contactsDataList
      .filter((contact) => contact?.id?.value)  // Only show contacts with an ID
      .filter((contact) => contact.name.first.charAt(0).toUpperCase() === selectedLetter)
  : contactsDataList.filter((contact) => contact?.id?.value);
```
This ensures that only contacts with valid IDs are shown, improving the user experience.


# suppurt devises 
this app responsive on any screen pc - labtop - tablet  - phone


# Files structure
```
├── src
│   ├── app
│   │   ├── api
|   |   |    ├── services
|   |   |    |      └── contact.service.ts
|   |   |    └── types
|   |   |           ├── api.types
|   |   |           └── contact.types
│   │   ├── constants
│   │   │       ├── endpoints.ts
│   │   │       ├── enums.ts
│   │   │       └── routes.ts
│   │   ├── routes
│   │   |     └── index.tsx
│   │   └── utils
│   │         └── truncateString.ts
│   ├── assets
│   │   └── img
│   ├── hooks
│   │   └── useInfiniteScroll.ts
│   ├── modules
│   │   ├── ContactList
│   │   │    ├── _components
|   |   |    |      ├── CardContact.tsx
|   |   |    |      ├── CardContactSkeleton.tsx
|   |   |    |      └── ContacDetailsSkeletion.tsx
|   |   |    ├──_view
|   |   |    |     └── ContacDetails
|   |   |    └── ContacList.tsx
|   |   |     
│   │   ├──  CreateContact
|   |   |    ├── _components
|   |   |    |      ├── CardContact.tsx
|   |   |    |      ├── CreateContactForm.tsx
|   |   |    |      └── PopOverMenuContact.tsx
|   |   |    └── CreateContact.tsx
│   ├── shadecn
│   │   ├── components
│   │   │   └── ui // All shadecn UI used
│   │   └── lib
│   └── shared
│   |    ├── layouts
│   |    |    ├── AppLayouts.tsx
│   |    |    └── ErrorBoundary.tsx  
│   |    └── ui
│   |       ├── Button  // All custom shared UI used and created
│   |       └── index.ts
│   └── store
│       ├── slices
│       |    └──  contact.slice.ts
│       └── store.ts
│
├── index.html
├── vite.config.ts
├── package.json
└── README.md
