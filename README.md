# srs_jupyterlab_extension

[![Github Actions Status](https://github.com/educational-technology-collective/srs-jupyterlab-extension/workflows/Build/badge.svg)](https://github.com/educational-technology-collective/srs-jupyterlab-extension/actions/workflows/build.yml)[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/educational-technology-collective/srs-jupyterlab-extension/main?urlpath=lab)
A JupyterLab extension.

This extension is composed of a Python package named `srs_jupyterlab_extension`
for the server extension and a NPM package named `srs-jupyterlab-extension`
for the frontend extension.

## Background

You are a computer science instructor who wants to help students learn from their coding activities during assignments, such as copy paste, error message, and in the future built-in Chatgpt messages through the method of spaced repetition.

==Introduce spaced repetition algorithm, flashcards and learning moments==

There are two questions here essentially that needs to be solved.
1. How to detect learning moment and which learning moments are valid to collect?
2. How to automatic generate new flashcards that are usable?

For question 1, we introduce two concepts: **Context** and **User Activity**. These two data are required for each newly captured and valid learning moment.

**Context** is background information about the assignment, including problem, solution and a preset of static flashcards for the assignment. *It is static and predetermined and per assignment per question.*

**User Activity** is data captured dynamically as the user is coding. For *copy_paste* learning moments, it can be pasted content, line number, ... For *error_message* learning moments, it can be error message, error callback, ... *It is dynamic and per learning moment.*

You can find the detailed info about interface in the next section.

## Interface

#### flashcard

```typescript
interface questionFlashcard {
  lm_id: number;
  type: "q";
  content: {
    question: string; // Question is limited to 200 characters
    answer: string; // Answer is limited to 200 characters
  };
  visibility: "public" | "dev" | "private";
  source?: string;
}

interface multipleChoiceFlashcard {
  lm_id: number;
  type: "m";
  content: {
    question: string; // Question is limited to 200 characters
    answer: Array<{ option: string; isCorrect: boolean }>; // Option is limited to 45 characters
  };
  visibility: "public" | "dev" | "private";
  source?: string;
}

export type flashcard = questionFlashcard | multipleChoiceFlashcard;
```

#### lm

```typescript
export interface lm {  
lm_id: number;  
platform: "jupyter";  
content_type: "copy_paste" | "error";  
content: {  
context: context;  
userActivitiy: userActivity;  
},  
visibility: "public" | "dev" | "private";  
}
```

#### context

```typescript
export interface context {
  cell_id: number;
  assignment_id: number;
  assignment_name: string;
  question_id: number;
  question_description: string;
  code_source: string;
  code_solution: string;
  static_flashcards: Array<flashcard>;
}
```
#### userActivity

```typescript
export interface userActivity {
  cell_id: number;
  assignment_id: number;
  assignment_name: string;
  question_id: number;
  question_description: string;
  code_source: string;
  code_solution: string;
  static_flashcards: Array<flashcard>;
}
```
## API Gateway

Given the interface and workflow, we have API Gateway routes designed as below:

- /dev/
	- context/{assignment_id}/{question_id}
		- **GET**
		- **PUT**
	- gpt/ -- **PUSH** Send contexts and userActivities data and return dynamic flashcards from ChatGPT
	- lm/
		- **POST**
		- **GET**
	- flashcards/
		- **POST**
		- **GET**
		- **PUT**
		- **DELETE**
	- upload/
		- lm -- **PUSH** Push learning moments to database
		- flashcard -- **PUSH** Upload flashcards to database

#### Flashcards API Endpoints

1. **Create a New Flashcard:**
	- Method: POST
	- Endpoint: `/flashcards`
	- Description: Creates a new flashcard.
	- Request Body: JSON object containing flashcard data.
	- Example Request: `POST /flashcards {...}`
2. **Read Flashcard Details:**
	- Method: GET
	- Endpoint: `/flashcards/{flashcard_id}`
	- Description: Retrieves details of a specific flashcard by its ID.
	- Example Request: `GET /flashcards/12345`
3. **Update Flashcard Details:**
	- Method: PUT
	- Endpoint: `/flashcards/{flashcard_id}`
	- Description: Updates details of a specific flashcard by its ID.
	- Request Body: JSON object containing updated flashcard data.
	- Example Request: `PUT /flashcards/12345 {...}`
4. **Delete Flashcard:**
	- Method: DELETE
	- Endpoint: `/flashcards/{flashcard_id}`
	- Description: Deletes a specific flashcard by its ID.
	- Example Request: `DELETE /flashcards/12345`

#### Learning Moments API Endpoints

1. **Capture a Learning Moment:**
	- Method: POST
	- Endpoint: `/learning-moments`
	- Description: Captures a new learning moment with user activity details.
	- Request Body: JSON object containing learning moment data, including context and user activity.
	- Example Request: `POST /learning-moments {...}`
2. **Retrieve Learning Moments for an Assignment:**
	- Method: GET
	- Endpoint: `/learning-moments/{assignment_id}`
	- Description: Retrieves all valid learning moments for a specific assignment.
	- Example Request: `GET /learning-moments/98765`

#### Static Context API Endpoints

1. **Retrieve Static Context for an Assignment and Question:**
	- Method: GET
	- Endpoint: `/static-context/{assignment_id}/{question_id}`
	- Description: Retrieves the static context information for a specific assignment and question.
	- Example Request: `GET /static-context/98765/54321`
2. **Update Static Context for an Assignment and Question:**
	- Method: PUT
	- Endpoint: `/static-context/{assignment_id}/{question_id}`
	- Description: Updates the static context information for a specific assignment and question.
	- Request Body: JSON object containing updated context data.
	- Example Request: `PUT /static-context/98765/54321 {...}`


## Requirements

- JupyterLab >= 4.0.0j

## Install

To install the extension, execute:

```bash
pip install srs_jupyterlab_extension
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall srs_jupyterlab_extension
```

## Troubleshoot

If you are seeing the frontend extension, but it is not working, check
that the server extension is enabled:

```bash
jupyter server extension list
```

If the server extension is installed and enabled, but you are not seeing
the frontend extension, check the frontend extension is installed:

```bash
jupyter labextension list
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the srs_jupyterlab_extension directory
# Install package in development mode
pip install -e ".[test]"
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Server extension must be manually installed in develop mode
jupyter server extension enable srs_jupyterlab_extension
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
# Server extension must be manually disabled in develop mode
jupyter server extension disable srs_jupyterlab_extension
pip uninstall srs_jupyterlab_extension
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `srs-jupyterlab-extension` within that folder.

### Testing the extension

#### Server tests

This extension is using [Pytest](https://docs.pytest.org/) for Python code testing.

Install test dependencies (needed only once):

```sh
pip install -e ".[test]"
# Each time you install the Python package, you need to restore the front-end extension link
jupyter labextension develop . --overwrite
```

To execute them, run:

```sh
pytest -vv -r ap --cov srs_jupyterlab_extension
```

#### Frontend tests

This extension is using [Jest](https://jestjs.io/) for JavaScript code testing.

To execute them, execute:

```sh
jlpm
jlpm test
```

#### Integration tests

This extension uses [Playwright](https://playwright.dev/docs/intro/) for the integration tests (aka user level tests).
More precisely, the JupyterLab helper [Galata](https://github.com/jupyterlab/jupyterlab/tree/master/galata) is used to handle testing the extension in JupyterLab.

More information are provided within the [ui-tests](./ui-tests/README.md) README.

### Packaging the extension

See [RELEASE](RELEASE.md)
