# KP INNER DOOR

---

This repo utilizes Pug templates and Sass to facilitate delivery of individual project components to the client, as well as the means to display a holistic view of the project during local development.

The custom Sass styles extend upon the existing KP styleguide, imported as a compiled "kitchen sink" CSS file.

Utilize NPM for any installation, scripts etc (_Do not use Yarn_).

## Setup:

Setup requires installing local "global" development dependencies (tools required to run some of the scripts), as well as the project dependencies.

### Install local development dependencies:

`npm install pug-cli -g`

### Install project dependencies:

`npm install`

## Project Scripts

After all dependencies are installed, to run the project for local development:

`npm run dev`

To run export scripts which will output individual components and YML specific CSS:

`npm run export`

## About Export

Running the export script will clear any existing `dist` folder, then create a folder structure of `dist/components`.

Individual Pug components will be output into their own subfolders, for example:

`dist/components/banner`
`dist/components/greeting`

A CSS file will be added to the root of the folder containing only the YML generated CSS specific to the created components:

`dist/components/kp-yml.css`

The client should import this CSS file at the end of their Sass chain, so it can inherit any other styles that it may depend on.

## Pug Help

Refer to the "Language Reference" section in the right hand page navigation:

[Pug reference](https://pugjs.org/language/attributes.html)

To convert existing HTML to Pug you can use this tool:

[Pug conversion tool](https://html2pug.now.sh/)
