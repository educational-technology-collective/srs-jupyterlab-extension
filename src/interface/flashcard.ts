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

export type staticFlashcards = Array<flashcard>;

export const a1_static_flashcards: staticFlashcards = [
    {
        lm_id: 1,
        type: "q",
        content: {
            question: "How can you extract all words starting with a capital letter from a string using regular expressions in Python?",
            answer: "To extract all words starting with a capital letter from a string using regular expressions in Python, first import the 're' library. Then, use the re.findall() function with the pattern r'[A-Z][a-z]*'. Pass the pattern and the input string as arguments to the function."
        },
        visibility: "public"
    },
    {
        lm_id: 2,
        type: "m",
        content: {
            question: "Which of the following regex patterns will correctly match words starting with a capital letter?",
            answer: [
                {option: "r'[A-Za-z]+'",
                 isCorrect: false},
                {option: "r'[A-Z][a-z]*'",
                 isCorrect: true},
                {option: "r'[a-zA-Z]+'",
                 isCorrect: false},
                {option: "r'[a-z][A-Z]+'",
                 isCorrect: false}
            ]
        },
        visibility: "public"
    },
    {
        lm_id: 3,
        type: "q",
        content: {
            question: "Which function of the 're' library is used to find all non-overlapping matches of a pattern in a string?",
            answer: "'re.findall()' is used to find all non-overlapping matches of a pattern in a given input string. It returns a list containing all matches found."
        },
        visibility: "public"
    },
    {
        lm_id: 4,
        type: "m",
        content: {
            question: "Which of the following regex patterns will correctly match names of students who received a B grade?",
            answer: [
                {option: "r'\w+\s\w+(?=: B)'",
                 isCorrect: true},
                {option: "r'\w+\s\w+(?= B)'",
                 isCorrect: false},
                {option: "r'\w+\s\w+'",
                 isCorrect: false},
                {option: "r': B'",
                 isCorrect: false}
            ]
        },
        visibility: "public"
    },
    {
        lm_id: 5,
        type: "q",
        content: {
            question: "How do you read a text file's content into a variable in Python?",
            answer: "To read a text file's content into a variable in Python, use the with statement and open() function: with open('filename', 'r') as file:. Inside the with block, use file.read() to read the content of the file into a variable."
        },
        visibility: "public"
    },
    {
        lm_id: 6,
        type: "q",
        content: {
            question: "How can you extract data from a web log and store it in a dictionary using regular expressions in Python?",
            answer: "To extract data from a web log and store it in a dictionary using regular expressions in Python, first import the 're' library. Define a regex pattern with named groups for each desired field, e.g., (?P<host>[\w\.]+). Use re.finditer() or re.findall() with the VERBOSE flag to find all matches. Iterate over the matches and use item.groupdict() to convert each match into a dictionary."
        },
        visibility: "public"
    },
    {
        lm_id: 7,
        type: "m",
        content: {
            question: "Which of the following regex patterns correctly captures the required fields (host, username, time, request) from a standard web log?",
            answer: [
                {"option": "r'([\w\.]+) \- (\\s+) \[(.+)\] \"(.)\"'", isCorrect: false},
                {"option": "r'(?P[\w\.]+) \- (?P<user_name>.) \[(?P.+)\] \"(?P. *)\"'", isCorrect: true},
                {"option": "r'([\w\.]+) (\\s+) (.+) (.+)'", isCorrect: false},
                {"option": "r'[\w\.]+ \\s+ .+ .+'", isCorrect: false}
            ]
        },
        visibility: "public"
    },
    {
        lm_id: 8,
        type: "q",
        content: {
            question: "How can you use named groups in a regular expression pattern?",
            answer: "To use named groups in a regular expression pattern, add ?P<group_name> inside the parentheses of the capturing group, followed by the pattern for that group. For example, (?P<host>[\\w\\.]+) defines a named group called 'host' that captures one or more word characters or periods."
        },
        visibility: "public"
    }
];

export const a2_static_flashcards: staticFlashcards = [
  {
    lm_id: 1,
    type: "m",
    content: {
      question: "Which of the following data structures is most suitable for storing proportions of children with mothers having different education levels?",
      answer: [
        { option: "List", isCorrect: false },
        { option: "Dictionary", isCorrect: true },
        { option: "Tuple", isCorrect: false },
        { option: "Set", isCorrect: false }
      ]
    },
    visibility: "public"
  },
  {
    lm_id: 2,
    type: "m",
    content: {
      question: "Which of the following Pandas methods can be used to count occurrences of unique values in a DataFrame column?",
      answer: [
        { option: ".count()", isCorrect: false },
        { option: ".unique()", isCorrect: false },
        { option: ".value_counts()", isCorrect: true },
        { option: ".groupby()", isCorrect: false }
      ]
    },
    visibility: "public"
  },
  {
    lm_id: 3,
    type: "q",
    content: {
      question: "How do you calculate the proportion of children with mothers having different education levels using Python and Pandas?",
      answer: "First, load the dataset using pandas.read_csv(). Then, filter rows based on the EDUC1 column values (1: less than high school, 2: high school, etc.). Count the number of rows for each education level using len(). Finally, divide each count by the total number of observations to get proportions, and store them in a dictionary."
    },
    visibility: "public"
  },
  {
    lm_id: 4,
    type: "q",
    content: {
      question: "How can you filter a DataFrame based on a specific column value in Pandas?",
      answer: "To filter a DataFrame based on a specific column value, use the syntax `df[df['column_name'] == value]`, where 'df' is the DataFrame, 'column_name' is the name of the column, and 'value' is the desired value to filter by."
    },
    visibility: "public"
  },
  {
    lm_id: 5,
    type: "m",
    content: {
      question: "What is the most suitable data structure for storing the ratio of children who contracted chickenpox but were vaccinated against it, separated by sex?",
      answer: [
        { option: "List", isCorrect: false },
        { option: "Dictionary", isCorrect: true },
        { option: "Tuple", isCorrect: false },
        { option: "Set", isCorrect: false }
      ]
    },
    visibility: "public"
  },
  {
    lm_id: 6,
    type: "q",
    content: {
      question: "How can you filter a DataFrame based on multiple conditions in Pandas?",
      answer: "To filter a DataFrame based on multiple conditions, use the syntax `df[(condition_1) & (condition_2) & ...]`, where 'df' is the DataFrame and each 'condition' is a comparison expression involving column values. Use '&' for 'AND' and '|' for 'OR' between conditions."
    },
    visibility: "public"
  },
  {
    lm_id: 7,
    type: "m",
    content: {
      question: "What does it mean if a positive correlation is found between having had chickenpox and receiving chickenpox vaccine doses?",
      answer: [
        {
          option: "An increase in chickenpox vaccine doses leads to an increase in cases of chickenpox.",
          isCorrect: true
        },
        {
          option: "An increase in chickenpox vaccine doses leads to a decrease in cases of chickenpox.",
          isCorrect: false
        },
        {
          option: "There is no relationship between receiving chickenpox vaccine doses and having had chickenpox.",
          isCorrect: false
        },
        {
          option: "An increase in chickenpox vaccine doses has no effect on cases of chickenpox.",
          isCorrect: false
        }
      ]
    },
    visibility: "public"
  },
  {
    lm_id: 8,
    type: "q",
    content: {
      question: "How can you calculate the Pearson correlation coefficient between two columns in a DataFrame using Python?",
      answer: "To calculate the Pearson correlation coefficient between two columns in a DataFrame using Python, first import the scipy.stats library. Then, use the `stats.pearsonr(column_1, column_2)` function where 'column_1' and 'column_2' are the two columns of interest. The function returns the correlation coefficient and p-value."
    },
    visibility: "public"
  },
  {
    lm_id: 9,
    type: "q",
    content: {
      question: "What is a correlation?",
      answer: "A correlation is a statistical relationship between two variables, indicating the extent to which they are related. It can be positive (both variables increase or decrease together) or negative (one variable increases as the other decreases). A correlation coefficient, such as Pearson's r, can quantify the strength and direction of this relationship."
    },
    visibility: "public"
  }
];
