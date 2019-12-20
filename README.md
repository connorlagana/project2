# **sendit**

### Overview
https://www.youtube.com/watch?v=WIrWyr3HgXI

**sendit™** is a financial analysis website used to scroll news articles, favorite stocks, view news and data for specific stocks, and vote on news articles.  **sendit™** will be using two to three API's for these functionalities.

<br>

### Wireframes

![Desktop Landing](https://i.imgur.com/U3oiNU7.png)

- Desktop Landing

<br>

![Desktop Hero](https://i.imgur.com/cSFd1ZJ.png)

- Desktop Hero

<br>

![Mobile Data Index](https://i.imgur.com/XpZs5T6.png)

- Mobile Data Index

<br>

***

<br>

### MVP

_The **sendit™** MVP is accessing a financial API and news API and sort them by Stock ticker associated with news.

#### Goals

- Utilize CSS
- Learn advanced API's (possibly OAuth)
- Upvotes
- Sort posts by upvoted

#### Libraries

> Use this section to list all supporting libraries and their role in the project.

|     Library      | Description                                |
| :--------------: | :----------------------------------------- |
|   React Router   | Used to route with react|
| Axios | Used for API calls |
|   Font awesome   | No explanation needed |

#### API Data

> Use the Data Section to define the API(s) you will be consuming for your project, inluding sample URL queries.

|    API     | Quality Docs? | Website       | Sample Query                            |
| :--------: | :-----------: | :------------ | :-------------------------------------- |
| Intrinio/StockNews |      yes      | https://intrinio.com |  |

#### React Components

_Component Hierarchy_

> Use this section to define your React components and the data architecture of your app.

```
src
|__ assets/
      |__ images
      |__ mockups
|__ components/
      |__ Header.jsx
      |__ Main.jsx
      |__ Post.jsx
      |__ Stock.jsx
      |__ Fetch.jsx
      |__ Footer.jsx
```

<br>

***

<br>

### Post-MVP

#### Post-MVP Goals

- Sort posts by upvotes
- different communites (subsends)
- search for stocks