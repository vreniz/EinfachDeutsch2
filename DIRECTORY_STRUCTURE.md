# EinfachDeutsch2 - Directory Structure Documentation

## Overview
The project has been successfully reorganized using a proper separation of concerns between pages and components, following React best practices.

## Directory Structure

### `/src/pages/` - Page-Level Components (Route Components)
These are the main components that correspond to application routes defined in `App.tsx`:

**Authentication Pages:**
- `LOGIN/` - Login page component
- `SIGNUP/` - User registration page component

**Main Application Pages:**
- `HOME/` - Application home/dashboard page
- `PROFILE/` - User profile management page
- `OVERALL_PROGRESS/` - Progress tracking overview page

**Learning Section Pages:**
- `A1SECTIONS/` - A1 language level sections overview
- `SECTION1_VIEW/` - Section 1 learning content
- `SECTION2_VIEW/` - Section 2 learning content  
- `SECTION3_VIEW/` - Section 3 learning content

**Practice Pages:**
- `PRACTICE_VIEW/` - Practice topics overview
- `FLASHCARDS_HOUSE/` - House vocabulary flashcards
- `FLASHCARDS_SCHOOL/` - School vocabulary flashcards
- `FLASHCARDS_FOOD/` - Food vocabulary flashcards
- `FLASHCARDS_TRAVEL/` - Travel vocabulary flashcards
- `FLASHCARDS_FAMILY/` - Family vocabulary flashcards

### `/src/components/` - Reusable Components (Widgets)
These are smaller, reusable UI components that are used across multiple pages:

**Navigation & Layout:**
- `NAVBAR/` - Main navigation component used across all pages
- `EXP_BAR/` - Experience/progress bar widget

**Interactive Learning Components:**
- `CLOZETEST/` - Cloze test exercise component for Section 1
- `CLOZETEST_S2/` - Cloze test exercise component for Section 2
- `FLASHCARDS/` - Basic flashcard component for Section 1
- `FLASHCARDS_2/` - Flashcard component for Section 2
- `QUESTIONS/` - Question component for Section 1
- `QUESTIONS_S2/` - Question component for Section 2
- `QUIZ/` - Quiz component for Section 1
- `QUIZ_2/` - Quiz component for Section 2

**UI Widgets:**
- `LESSON_BOARD/` - Lesson content display component
- `MARK_AS_DONE_BUTTON/` - Progress marking button component
- `PROGRESS_REPORT/` - Progress reporting widget
- `BADGE_UNLOCKED_1/` - Achievement badge component (Level 1)
- `BADGE_UNLOCKED_2/` - Achievement badge component (Level 2)

## Import Pattern

### From App.tsx to Pages:
```typescript
import Home from './pages/HOME';
import SignUp from './pages/SIGNUP';
// etc.
```

### From Pages to Components:
```typescript
import Navbar from '../../components/NAVBAR';
import Quiz from '../../components/QUIZ';
// etc.
```

### From Components to Data/Assets:
```typescript
import { vocabularyData } from '../../data/VocabularyData';
import icon from '../../assets/icon.png';
// etc.
```

## Benefits of This Structure

1. **Clear Separation of Concerns**: Pages handle routing and high-level layout, components handle reusable UI logic
2. **Better Maintainability**: Related files are grouped together in their own directories
3. **Improved Reusability**: Components can be easily shared between different pages
4. **Cleaner Imports**: Logical import paths that reflect the application architecture
5. **Scalability**: New pages and components can be easily added following the established pattern

## File Organization Within Each Directory

Each component/page directory follows this pattern:
```
COMPONENT_NAME/
├── ComponentName.tsx    # Main component file
└── index.ts            # Clean export (export { default } from './ComponentName')
```

This allows for clean imports using just the directory name:
```typescript
import ComponentName from './components/COMPONENT_NAME';
```

## Naming Convention

- **Directories**: SCREAMING_CASE (e.g., `FLASHCARDS_HOUSE/`)
- **TypeScript Files**: PascalCase (e.g., `FlashcardsHouse.tsx`)
- **Index Files**: lowercase (e.g., `index.ts`)

This structure provides a robust foundation for continued development and maintenance of the EinfachDeutsch2 application.
