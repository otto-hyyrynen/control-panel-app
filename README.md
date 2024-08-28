# Start development server

Install dependencies

```
yarn
```

Start dev server

```
yarn dev
```

# Project summary

This is React project boot strapped with Vite (https://vitejs.dev) and Typescript.

State management is handled with Redux toolkit. Redux related stuff is divided into slices, which in this case,
there is only one: projectSlice.ts

Inside projectsSlice.ts there is the initial provided data. I have imported the data with some additional parameters
to help keep the state in shape.

Other components are stored inside features folder. ControlPanel is basically divided into two parts: the projects list
(containing the project items as rows) and control buttons area.

I have not used any css preprocessors, since the scope of the project is small. I have also not included any unit tests,
although they could be easily added with Jest and React testing library.
