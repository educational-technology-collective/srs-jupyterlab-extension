import { flashcard } from './flashcard';

export interface context {
  assignmentId: number;
  assignmentDescription: string;
  questionId: number;
  questionDescription: string;
  codeSource: string;
  codeSolution: string;
  unitTest: string;
  hiddenTest: string;
}

export const a1_static_flashcards: Array<flashcard> = [
    {
        lm_id: 1,
        type: "q",
        content: {
            question: "How can you extract all words starting with a capital letter from a string using regular expressions in Python?",
            answer: "To extract all words starting with a capital letter from a string using regular expressions in Python, first import the 're' library. Then, use the re.findall() function with the pattern r'[A-Z][a-z]*'. Pass the pattern and the input string as arguments to the function."
        },
        visibility: "development",
        source: "Expert"
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
        visibility: "development",
        source: "Expert"
    },
    {
        lm_id: 3,
        type: "q",
        content: {
            question: "Which function of the 're' library is used to find all non-overlapping matches of a pattern in a string?",
            answer: "'re.findall()' is used to find all non-overlapping matches of a pattern in a given input string. It returns a list containing all matches found."
        },
        visibility: "development",
        source: "Expert"
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
        visibility: "development",
        source: "Expert"
    },
    {
        lm_id: 5,
        type: "q",
        content: {
            question: "How do you read a text file's content into a variable in Python?",
            answer: "To read a text file's content into a variable in Python, use the with statement and open() function: with open('filename', 'r') as file:. Inside the with block, use file.read() to read the content of the file into a variable."
        },
        visibility: "development",
        source: "Expert"
    },
    {
        lm_id: 6,
        type: "q",
        content: {
            question: "How can you extract data from a web log and store it in a dictionary using regular expressions in Python?",
            answer: "To extract data from a web log and store it in a dictionary using regular expressions in Python, first import the 're' library. Define a regex pattern with named groups for each desired field, e.g., (?P<host>[\w\.]+). Use re.finditer() or re.findall() with the VERBOSE flag to find all matches. Iterate over the matches and use item.groupdict() to convert each match into a dictionary."
        },
        visibility: "development",
        source: "Expert"
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
        visibility: "development",
        source: "Expert"
    },
    {
        lm_id: 8,
        type: "q",
        content: {
            question: "How can you use named groups in a regular expression pattern?",
            answer: "To use named groups in a regular expression pattern, add ?P<group_name> inside the parentheses of the capturing group, followed by the pattern for that group. For example, (?P<host>[\\w\\.]+) defines a named group called 'host' that captures one or more word characters or periods."
        },
        visibility: "development",
        source: "Expert"
    }
];

export const a2_static_flashcards: Array<flashcard> = [
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
    visibility: "development",
    source: "Expert"
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
    visibility: "development",
    source: "Expert"
  },
  {
    lm_id: 3,
    type: "q",
    content: {
      question: "How do you calculate the proportion of children with mothers having different education levels using Python and Pandas?",
      answer: "First, load the dataset using pandas.read_csv(). Then, filter rows based on the EDUC1 column values (1: less than high school, 2: high school, etc.). Count the number of rows for each education level using len(). Finally, divide each count by the total number of observations to get proportions, and store them in a dictionary."
    },
    visibility: "development",
    source: "Expert"
  },
  {
    lm_id: 4,
    type: "q",
    content: {
      question: "How can you filter a DataFrame based on a specific column value in Pandas?",
      answer: "To filter a DataFrame based on a specific column value, use the syntax `df[df['column_name'] == value]`, where 'df' is the DataFrame, 'column_name' is the name of the column, and 'value' is the desired value to filter by."
    },
    visibility: "development",
    source: "Expert"
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
    visibility: "development",
    source: "Expert"
  },
  {
    lm_id: 6,
    type: "q",
    content: {
      question: "How can you filter a DataFrame based on multiple conditions in Pandas?",
      answer: "To filter a DataFrame based on multiple conditions, use the syntax `df[(condition_1) & (condition_2) & ...]`, where 'df' is the DataFrame and each 'condition' is a comparison expression involving column values. Use '&' for 'AND' and '|' for 'OR' between conditions."
    },
    visibility: "development",
    source: "Expert"
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
    visibility: "development",
    source: "Expert"
  },
  {
    lm_id: 8,
    type: "q",
    content: {
      question: "How can you calculate the Pearson correlation coefficient between two columns in a DataFrame using Python?",
      answer: "To calculate the Pearson correlation coefficient between two columns in a DataFrame using Python, first import the scipy.stats library. Then, use the `stats.pearsonr(column_1, column_2)` function where 'column_1' and 'column_2' are the two columns of interest. The function returns the correlation coefficient and p-value."
    },
    visibility: "development",
    source: "Expert"
  },
  {
    lm_id: 9,
    type: "q",
    content: {
      question: "What is a correlation?",
      answer: "A correlation is a statistical relationship between two variables, indicating the extent to which they are related. It can be positive (both variables increase or decrease together) or negative (one variable increases as the other decreases). A correlation coefficient, such as Pearson's r, can quantify the strength and direction of this relationship."
    },
    visibility: "development",
    source: "Expert"
  }
];

export const initial_context: Array<context> = [
  {
    assignmentId: 1,
    assignmentDescription: "# Assignment 1\n" +
      "Before you start working on the problems, here is a small example to help you understand how to write your answers. The solution should be written within the function body given, and the final result should be returned. Then the autograder will try to call the function and validate your returned result accordingly. Before submitting to the autograder, see if the tests we have included with this file pass by pressing the *Validate* button on the toolbar.\n" +
      "\n" +
      "**Note: For all assignments please write all of your code within the function we define in order to ensure it is run by the autograder correctly**",
    questionId: 1,
    questionDescription : "## Question 1: names()\n" +
      "\n" +
      "Fix the incorrect regex between `### FIX CODE BELOW` and `### FIX CODE ABOVE` to generate a list of names in the simple_string.",
    codeSource: "def names():\n" +
      "    import re\n" +
      "    simple_string = \"\"\"Amy is 5 years old, and her sister Mary is 2 years old. \n" +
      "    Ruth and Peter, their parents, have 3 kids.\"\"\"\n" +
      "\n" +
      "    ### FIX CODE BELOW  \n" +
      "    pattern = r'[A-Za-z]?'\n" +
      "    match = re.finditer(pattern, simple_string)\n" +
      "    ### FIX CODE ABOVE  \n" +
      "    \n" +
      "    \n" +
      "    return match\n" +
      "    \n" +
      "names()",
    codeSolution: "def names():\n" +
      "    import re\n" +
      "    simple_string = \"\"\"Amy is 5 years old, and her sister Mary is 2 years old. \n" +
      "    Ruth and Peter, their parents, have 3 kids.\"\"\"\n" +
      "\n" +
      "    ### FIX CODE BELOW  \n" +
      "    pattern = r'[A-Za-z]?'\n" +
      "    match = re.finditer(pattern, simple_string)\n" +
      "    ### FIX CODE ABOVE  \n" +
      "    \n" +
      "    ### BEGIN SOLUTION\n" +
      "    pattern = r'[A-Z][a-z]*'\n" +
      "    match = re.findall(pattern, simple_string)\n" +
      "\n" +
      "    # Alternative answers: \n" +
      "    # pattern = r'[A-Z]\\w+'\n" +
      "    # pattern = r'[A-Z]\\S+'\n" +
      "    ### END SOLUTION\n" +
      "    \n" +
      "    return match\n" +
      "    \n" +
      "names()",
    unitTest: "assert len(names()) == 4, \"There are four names in the simple_string\"",
    hiddenTest: "### BEGIN HIDDEN TESTS\n" +
      "assert ((len(names()[0])>2)&(len(names()[0])>2)&(len(names()[0])>2)&(len(names()[0])>2)) == True, \"Please match all the characters in these names.\"\n" +
      "assert ('Amy' in names())== True\n" +
      "assert ('Mary' in names())== True\n" +
      "assert ('Ruth' in names())== True\n" +
      "assert ('Peter' in names())== True\n" +
      "### END HIDDEN TESTS\n"
  },
  {
    assignmentId: 1,
    assignmentDescription: "# Assignment 1\n" +
      "Before you start working on the problems, here is a small example to help you understand how to write your answers. The solution should be written within the function body given, and the final result should be returned. Then the autograder will try to call the function and validate your returned result accordingly. Before submitting to the autograder, see if the tests we have included with this file pass by pressing the *Validate* button on the toolbar.\n" +
      "\n" +
      "**Note: For all assignments please write all of your code within the function we define in order to ensure it is run by the autograder correctly**",
    questionId: 2,
    questionDescription: "## Question 2: student_grades()\n" +
      "\n" +
      "The dataset file in [assets/grades.txt](assets/grades.txt) contains multiple lines of people along with their grades in a class. Fix the incorrect regex between `### FIX CODE BELOW` and `### FIX CODE ABOVE` to generate a list of just those students who received a B in the course (e.g., \\[\\'John Doe\\', \\'Jane Doe\\'\\].)",
    codeSource: "def student_grades():\n" +
      "    import re\n" +
      "    with open (\"assets/grades.txt\", \"r\") as file:\n" +
      "        grades = file.read()\n" +
      "\n" +
      "    ### FIX CODE BELOW\n" +
      "    pattern = \"\"\"(\\w+)\"\"\"\n" +
      "    matches = re.findall(pattern,grades)\n" +
      "    ### FIX CODE ABOVE\n" +
      "        \n" +
      "        \n" +
      "\n" +
      "    return matches  \n" +
      "    \n" +
      "student_grades()",
    codeSolution: "def student_grades():\n" +
      "    import re\n" +
      "    with open (\"assets/grades.txt\", \"r\") as file:\n" +
      "        grades = file.read()\n" +
      "\n" +
      "    ### FIX CODE BELOW\n" +
      "    pattern = \"\"\"(\\w+)\"\"\"\n" +
      "    matches = re.findall(pattern,grades)\n" +
      "    ### FIX CODE ABOVE\n" +
      "        \n" +
      "        \n" +
      "    ### BEGIN SOLUTION\n" +
      "    pattern = re.compile(r'\\w+\\s\\w+(?=: B)')\n" +
      "    matches = re.findall(pattern,grades)\n" +
      "\n" +
      "    # Alternative answers: \n" +
      "    # pattern = \"\"\"(?P<test>\\w+\\s+\\w+): B\"\"\"\n" +
      "    \n" +
      "    ### END SOLUTION   \n" +
      "\n" +
      "    return matches  \n" +
      "    \n" +
      "student_grades()",
    unitTest: "assert len(student_grades()) == 16, \"There are 16 students who received a B in the course\"",
    hiddenTest: "### BEGIN HIDDEN TESTS\n" +
      "\n" +
      "name_list = ['Bell Kassulke',\n" +
      " 'Simon Loidl',\n" +
      " 'Elias Jovanovic',\n" +
      " 'Hakim Botros',\n" +
      " 'Emilie Lorentsen',\n" +
      " 'Jake Wood',\n" +
      " 'Fatemeh Akhtar',\n" +
      " 'Kim Weston',\n" +
      " 'Yasmin Dar',\n" +
      " 'Viswamitra Upandhye',\n" +
      " 'Killian Kaufman',\n" +
      " 'Elwood Page',\n" +
      " 'Elodie Booker',\n" +
      " 'Adnan Chen',\n" +
      " 'Hank Spinka',\n" +
      " 'Hannah Bayer']\n" +
      "\n" +
      "assert (': B' in student_grades()[1]) == False, \"Please only return student names.\"\n" +
      "assert ('Kassulke' in student_grades()) == False, \"Please return students' full name.\"\n" +
      "for name in name_list:\n" +
      "    assert (name in student_grades())== True, \"Check your name list.\"\n" +
      "    \n" +
      "### END HIDDEN TESTS"
  },
  {
    assignmentId: 1,
    assignmentDescription: "# Assignment 1\n" +
      "Before you start working on the problems, here is a small example to help you understand how to write your answers. The solution should be written within the function body given, and the final result should be returned. Then the autograder will try to call the function and validate your returned result accordingly. Before submitting to the autograder, see if the tests we have included with this file pass by pressing the *Validate* button on the toolbar.\n" +
      "\n" +
      "**Note: For all assignments please write all of your code within the function we define in order to ensure it is run by the autograder correctly**",
    questionId: 3,
    questionDescription: "## Question 3: logs()\n" +
      "Consider the variable 'logdata' which is a string containing a standard web log. This variable records the access a user makes when visiting a web page (like this one!). Each line of the log has the following items: \n" +
      "\n" +
      "* a host (e.g., ‘146.204.224.152’) \n" +
      "* a username (e.g., ‘feest6811’ or sometime '-' since it is missing) \n" +
      "* the time a request was made (e.g., ‘21/Jun/2019:15:45:24 -0700’) \n" +
      "* the post request type (e.g., ‘POST /incentivize HTTP/1.1’)\n" +
      "\n" +
      "Your task is to fix the incorrect regex between `### FIX CODE BELOW` and `### FIX CODE ABOVE` to convert the given data into a list of dictionaries, where each dictionary looks like the following:\n" +
      "\n" +
      "```\n" +
      "example_dict = {\"host\":\"146.204.224.152\",\n" +
      "                \"user_name\":\"feest6811\",\n" +
      "                \"time\":\"21/Jun/2019:15:45:24 -0700\",\n" +
      "                \"request\":\"POST /incentivize HTTP/1.1\"}\n" +
      "```",
    codeSource: "def logs():\n" +
      "    import re\n" +
      "    with open(\"assets/logdata.txt\", \"r\") as file:\n" +
      "        logdata = file.read()\n" +
      "    \n" +
      "        \n" +
      "    ### FIX CODE BELOW    \n" +
      "    pattern = \"\"\"\n" +
      "        ([.]+)                       # host %h\n" +
      "        \\s\\-\\s(.+)\\s                 # user %u\n" +
      "        \\[(.+)\\]                     # time %t\n" +
      "        \\s\\\"(\\w\\.\+)\\\"                # request \"%r\"\n" +
      "    \"\"\"\n" +
      "    result = [item.groupdict() for item in re.findall(pattern,logdata,re.VERBOSE)]\n" +
      "\n" +
      "    ### FIX CODE ABOVE\n" +
      "    \n" +
      "\n" +
      "    return result\n",
    codeSolution: "def logs():\n" +
      "    import re\n" +
      "    with open(\"assets/logdata.txt\", \"r\") as file:\n" +
      "        logdata = file.read()\n" +
      "    \n" +
      "        \n" +
      "    ### FIX CODE BELOW    \n" +
      "    pattern = \"\"\"\n" +
      "        ([.]+)                       # host %h\n" +
      "        \\s\\-\\s(.+)\\s                 # user %u\n" +
      "        \\[(.+)\\]                     # time %t\n" +
      "        \\s\\\"(\\w\\.\+)\\\"                # request \"%r\"\n" +
      "    \"\"\"\n" +
      "    result = [item.groupdict() for item in re.findall(pattern,logdata,re.VERBOSE)]\n" +
      "\n" +
      "    ### FIX CODE ABOVE\n" +
      "    \n" +
      "\n" +
      "    ### BEGIN SOLUTION\n" +
      "    pattern = \"\"\"\n" +
      "        (?P<host>[\\w\\.]+)             # host %h\n" +
      "        \\s\\-\\s(?P<user_name>.*)\\s     # user %u\n" +
      "        \\[(?P<time>.+)\\]              # time %t\n" +
      "        \\s\\\"(? P<request>. *)\\\"         # request \"%r\"\n" +
      "    \"\"\"\n" +
      "    result = [item.groupdict() for item in re.finditer(pattern,logdata,re.VERBOSE)]\n" +
      "\n" +
      "    ### END SOLUTION\n" +
      "\n" +
      "    return result\n",
    unitTest: "assert len(logs()) == 979, \"There are 979 lines in the logdata.txt file\"",
    hiddenTest: "### BEGIN HIDDEN TESTS\n"
  },
  {
    assignmentId: 2,
    assignmentDescription: "# Assignment 2\n" +
      "For this assignment you'll be looking at 2017 data on immunizations from the CDC. Your datafile for this assignment is in [assets/NISPUF17.csv](assets/NISPUF17.csv). A data users guide for this, which you'll need to understand and map the variables in the data to the questions being asked, is available at [assets/NIS-PUF17-DUG.pdf](assets/NIS-PUF17-DUG.pdf) and [assets/NIS-PUF17-CODEBOOK.pdf](assets/NIS-PUF17-CODEBOOK.pdf). \n" +
      "\n" +
      "**Note: For all assignments please write all of your code within the function we define in order to ensure it is run by the autograder correctly**",
    questionId: 1,
    questionDescription: "## Question 1: proportion_of_education()\n" +
      "Write a function called `proportion_of_education` which returns the proportion of children in the dataset who had a mother with the education levels equal to less than high school (<12), high school (12), more than high school but not a college graduate (>12) and college degree.\n" +
      "\n" +
      "*This function should return a dictionary in the form of (use the correct numbers, do not round numbers):* \n" +
      "```\n" +
      "    {\"less than high school\":0.2,\n" +
      "    \"high school\":0.4,\n" +
      "    \"more than high school but not college\":0.2,\n" +
      "    \"college\":0.2}\n" +
      "```",
    codeSource: "def proportion_of_education():\n" +
      "    # your code goes here\n",
    codeSolution: "def proportion_of_education():\n" +
      "    # your code goes here\n" +
      "    ### BEGIN SOLUTION\n" +
      "    def answer_proportion_of_education():\n" +
      "        import pandas as pd\n" +
      "        import numpy as np\n" +
      "\n" +
      "        df= pd.read_csv(\"assets/NISPUF17.csv\")\n" +
      "        obs=len(df)\n" +
      "\n" +
      "        return {\"less than high school\":len(df[df[\"EDUC1\"]==1])/obs,\n" +
      "                \"high school\":len(df[df[\"EDUC1\"]==2])/obs,\n" +
      "                \"more than high school but not college\":len(df[df[\"EDUC1\"]==3])/obs,\n" +
      "                \"college\":len(df[df[\"EDUC1\"]==4])/obs}\n" +
      "\n" +
      "    return answer_proportion_of_education()\n" +
      "    ### END SOLUTION\n",
    unitTest: "assert type(proportion_of_education())==type({}), \"You must return a dictionary.\"\n" +
      "assert len(proportion_of_education()) == 4, \"You have not returned a dictionary with four items in it.\"\n" +
      "assert \"less than high school\" in proportion_of_education().keys(), \"You have not returned a dictionary with the correct keys.\"\n" +
      "assert \"high school\" in proportion_of_education().keys(), \"You have not returned a dictionary with the correct keys.\"\n" +
      "assert \"more than high school but not college\" in proportion_of_education().keys(), \"You have not returned a dictionary with the correct keys.\"\n" +
      "assert \"college\" in proportion_of_education().keys(), \"You have not returned a dictionary with the correct keys.\"",
    hiddenTest: "### BEGIN HIDDEN TESTS\n" +
      "def answer_proportion_of_education():\n" +
      "    import pandas as pd\n" +
      "    import numpy as np\n" +
      "\n" +
      "    df= pd.read_csv(\"assets/NISPUF17.csv\")\n" +
      "    obs=len(df)\n" +
      "\n" +
      "    return {\"less than high school\":len(df[df[\"EDUC1\"]==1])/obs,\n" +
      "            \"high school\":len(df[df[\"EDUC1\"]==2])/obs,\n" +
      "            \"more than high school but not college\":len(df[df[\"EDUC1\"]==3])/obs,\n" +
      "            \"college\":len(df[df[\"EDUC1\"]==4])/obs}\n" +
      "\n" +
      "if (proportion_of_education()!=answer_proportion_of_education()):\n" +
      "    raise AssertionError(\"That is the incorrect solution.\")   \n" +
      "### END HIDDEN TESTS\n"
  },
  {
    assignmentId: 2,
    assignmentDescription: "# Assignment 2\n" +
      "For this assignment you'll be looking at 2017 data on immunizations from the CDC. Your datafile for this assignment is in [assets/NISPUF17.csv](assets/NISPUF17.csv). A data users guide for this, which you'll need to understand and map the variables in the data to the questions being asked, is available at [assets/NIS-PUF17-DUG.pdf](assets/NIS-PUF17-DUG.pdf) and [assets/NIS-PUF17-CODEBOOK.pdf](assets/NIS-PUF17-CODEBOOK.pdf). \n" +
      "\n" +
      "**Note: For all assignments please write all of your code within the function we define in order to ensure it is run by the autograder correctly**",
    questionId: 2,
    questionDescription: "## Question 2: chickenpox_by_sex()\n" +
      "It would be interesting to see if there is any evidence of a link between vaccine effectiveness and sex of the child. Calculate the ratio of the number of children who contracted chickenpox but were vaccinated against it (at least one varicella dose) versus those who were vaccinated but did not contract chicken pox. Return results by sex. \n" +
      "\n" +
      "*This function should return a dictionary in the form of (use the correct numbers):* \n" +
      "```\n" +
      "    {\"male\":0.2,\n" +
      "    \"female\":0.4}\n" +
      "```\n" +
      "\n" +
      "Note: To aid in verification, the `chickenpox_by_sex()['female']` value the autograder is looking for starts with the digits `0.00779`.",
    codeSource: "def chickenpox_by_sex():\n",
    codeSolution: "def chickenpox_by_sex():\n" +
      "    ### BEGIN SOLUTION\n" +
      "    def answer_chickenpox_by_sex():\n" +
      "        import pandas as pd\n" +
      "        import numpy as np\n" +
      "\n" +
      "        df=pd.read_csv(\"assets/NISPUF17.csv\")\n" +
      "\n" +
      "        male=len(df.where((df[\"SEX\"]==1) & (df[\"HAD_CPOX\"]==1) & (df[\"P_NUMVRC\"]>0))[[\"SEX\",\"HAD_CPOX\",\"P_NUMVRC\"]].dropna())/len(df.where((df[\"SEX\"]==1) & (df[\"HAD_CPOX\"]==2) & (df[\"P_NUMVRC\"]>0))[[\"SEX\",\"HAD_CPOX\",\"P_NUMVRC\"]].dropna())\n" +
      "        female=len(df.where((df[\"SEX\"]==2) & (df[\"HAD_CPOX\"]==1) & (df[\"P_NUMVRC\"]>0))[[\"SEX\",\"HAD_CPOX\",\"P_NUMVRC\"]].dropna())/len(df.where((df[\"SEX\"]==2) & (df[\"HAD_CPOX\"]==2) & (df[\"P_NUMVRC\"]>0))[[\"SEX\",\"HAD_CPOX\",\"P_NUMVRC\"]].dropna())\n" +
      "        \n" +
      "        return {\"male\": male, \"female\": female}\n" +
      "\n" +
      "    return answer_chickenpox_by_sex()\n" +
      "    ### END SOLUTION",
    unitTest: "assert len(chickenpox_by_sex())==2, \"Return a dictionary with two items, the first for males and the second for females.\"",
    hiddenTest: "### BEGIN HIDDEN TESTS\n" +
      "def answer_chickenpox_by_sex():\n" +
      "    import pandas as pd\n" +
      "    import numpy as np\n" +
      "\n" +
      "    df=pd.read_csv(\"assets/NISPUF17.csv\")\n" +
      "\n" +
      "    male=len(df.where((df[\"SEX\"]==1) & (df[\"HAD_CPOX\"]==1) & (df[\"P_NUMVRC\"]>0))[[\"SEX\",\"HAD_CPOX\",\"P_NUMVRC\"]].dropna())/len(df.where((df[\"SEX\"]==1) & (df[\"HAD_CPOX\"]==2) & (df[\"P_NUMVRC\"]>0))[[\"SEX\",\"HAD_CPOX\",\"P_NUMVRC\"]].dropna())\n" +
      "    female=len(df.where((df[\"SEX\"]==2) & (df[\"HAD_CPOX\"]==1) & (df[\"P_NUMVRC\"]>0))[[\"SEX\",\"HAD_CPOX\",\"P_NUMVRC\"]].dropna())/len(df.where((df[\"SEX\"]==2) & (df[\"HAD_CPOX\"]==2) & (df[\"P_NUMVRC\"]>0))[[\"SEX\",\"HAD_CPOX\",\"P_NUMVRC\"]].dropna())\n" +
      "\n" +
      "    return {\"male\": male, \"female\": female}\n" +
      "\n" +
      "if (chickenpox_by_sex()!=answer_chickenpox_by_sex()):\n" +
      "    raise AssertionError(\"That is the incorrect solution\") \n" +
      "### END HIDDEN TESTS\n"
  },
  {
    assignmentId: 2,
    assignmentDescription: "# Assignment 2\n" +
      "For this assignment you'll be looking at 2017 data on immunizations from the CDC. Your datafile for this assignment is in [assets/NISPUF17.csv](assets/NISPUF17.csv). A data users guide for this, which you'll need to understand and map the variables in the data to the questions being asked, is available at [assets/NIS-PUF17-DUG.pdf](assets/NIS-PUF17-DUG.pdf) and [assets/NIS-PUF17-CODEBOOK.pdf](assets/NIS-PUF17-CODEBOOK.pdf). \n" +
      "\n" +
      "**Note: For all assignments please write all of your code within the function we define in order to ensure it is run by the autograder correctly**",
    questionId: 3,
    questionDescription: "## Question 3: corr_chickenpox()\n" +
      "A correlation is a statistical relationship between two variables. If we wanted to know if vaccines work, we might look at the correlation between the use of the vaccine and whether it results in prevention of the infection or disease [1]. In this question, you are to see if there is a correlation between having had the chicken pox and the number of chickenpox vaccine doses given (varicella).\n" +
      "\n" +
      "Some notes on interpreting the answer. The `had_chickenpox_column` is either `1` (for yes) or `2` (for no), and the `num_chickenpox_vaccine_column` is the number of doses a child has been given of the varicella vaccine. A positive correlation (e.g., `corr > 0`) means that an increase in `had_chickenpox_column` (which means more no's) would also increase the values of `num_chickenpox_vaccine_column` (which means more doses of vaccine). If there is a negative correlation (e.g., `corr < 0`), it indicates that having had chickenpox is related to an increase in the number of vaccine doses. \n" +
      "\n" +
      "Also, `pval` is the probability that we observe a correlation between `had_chickenpox_column` and `num_chickenpox_vaccine_column` which is greater than or equal to a particular value occurred by chance. A small `pval` means that the observed correlation is highly unlikely to occur by chance. In this case, `pval` should be very small (will end in `e-18` indicating a very small number).\n" +
      "\n" +
      "[1] This isn't really the full picture, since we are not looking at when the dose was given. It's possible that children had chickenpox and then their parents went to get them the vaccine. Does this dataset have the data we would need to investigate the timing of the dose?",
    codeSource: "def corr_chickenpox():\n" +
      "    import scipy.stats as stats\n" +
      "    import numpy as np\n" +
      "    import pandas as pd\n" +
      "    \n" +
      "    # this is just an example dataframe\n" +
      "    df=pd.DataFrame({\"had_chickenpox_column\":np.random.randint(1,3,size=(100)),\n" +
      "                   \"num_chickenpox_vaccine_column\":np.random.randint(0,6,size=(100))})\n" +
      "\n" +
      "    # here is some stub code to actually run the correlation\n" +
      "    corr, pval=stats.pearsonr(df[\"had_chickenpox_column\"],df[\"num_chickenpox_vaccine_column\"])\n" +
      "    \n" +
      "    # just return the correlation\n" +
      "    #return corr\n",
    codeSolution: "def corr_chickenpox():\n" +
      "    import scipy.stats as stats\n" +
      "    import numpy as np\n" +
      "    import pandas as pd\n" +
      "    \n" +
      "    # this is just an example dataframe\n" +
      "    df=pd.DataFrame({\"had_chickenpox_column\":np.random.randint(1,3,size=(100)),\n" +
      "                   \"num_chickenpox_vaccine_column\":np.random.randint(0,6,size=(100))})\n" +
      "\n" +
      "    # here is some stub code to actually run the correlation\n" +
      "    corr, pval=stats.pearsonr(df[\"had_chickenpox_column\"],df[\"num_chickenpox_vaccine_column\"])\n" +
      "    \n" +
      "    # just return the correlation\n" +
      "    #return corr\n" +
      "\n" +
      "    ### BEGIN SOLUTION\n" +
      "    def answer_corr_chickenpox():\n" +
      "        import scipy.stats as stats\n" +
      "        import pandas as pd\n" +
      "        import numpy as np\n" +
      "\n" +
      "        df=pd.read_csv(\"assets/NISPUF17.csv\")[[\"HAD_CPOX\",\"P_NUMVRC\"]]\n" +
      "        df=df.dropna()\n" +
      "\n" +
      "        #remove people we don't know had the chickenpox\n" +
      "        df=df.where(df[\"HAD_CPOX\"]<3).dropna()\n" +
      "\n" +
      "        had_chickenpox_column=df[\"HAD_CPOX\"]\n" +
      "        num_chickenpox_vaccine_column=df[\"P_NUMVRC\"]\n" +
      "\n" +
      "        corr, pval=stats.pearsonr(had_chickenpox_column,num_chickenpox_vaccine_column)\n" +
      "        return corr\n" +
      "    \n" +
      "    return answer_corr_chickenpox()\n" +
      "    ### END SOLUTION\n",
    unitTest: "assert -1<=corr_chickenpox()<=1, \"You must return a float number between -1.0 and 1.0.\"",
    hiddenTest: "### BEGIN HIDDEN TESTS\n" +
      "#assert corr_chickenpox()==corr_chickenpox(), \"Your correlation value should not change between invocations.\"\n" +
      "\n" +
      "def answer_corr_chickenpox():\n" +
      "    import scipy.stats as stats\n" +
      "    import pandas as pd\n" +
      "    import numpy as np\n" +
      "\n" +
      "    df=pd.read_csv(\"assets/NISPUF17.csv\")[[\"HAD_CPOX\",\"P_NUMVRC\"]]\n" +
      "    df=df.dropna()\n" +
      "\n" +
      "    #remove people we don't know had the chickenpox\n" +
      "    df=df.where(df[\"HAD_CPOX\"]<3).dropna()\n" +
      "\n" +
      "    had_chickenpox_column=df[\"HAD_CPOX\"]\n" +
      "    num_chickenpox_vaccine_column=df[\"P_NUMVRC\"]\n" +
      "\n" +
      "    corr, pval=stats.pearsonr(had_chickenpox_column,num_chickenpox_vaccine_column)\n" +
      "    return corr\n" +
      "\n" +
      "if (corr_chickenpox()!=answer_corr_chickenpox()):\n" +
      "    raise AssertionError(\"That is the incorrect solution\") \n" +
      "### END HIDDEN TESTS"
  }
]
