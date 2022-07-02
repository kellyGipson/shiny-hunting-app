# ShinyHuntingApp

This Angular application serves as a feature-full shiny hunting app for use with Pokemon games.

## Useage

- The 'space' key or the white plus button increment the counter

- The '0'(zero) key or the red minus button decrement the counter

- The '+' key increments the interval count

- The '-' key decrements the interval count

## The navigation at the top of the page navigates between the counter page, and the Pokemon that you've found while hunting.

### The Counter Page

The currect count is saved to your browser's local storage on every increment, or decrement. 
The reset button will delete your current count and reset it to zero.
When you've found a shiny, the sparkle button will automatically save the current Pokemon.

### The Pokemon Page

The 'Add Shiny' button will allow you to manually add a Pokemon.
The Delete buttons(If there are any saved Pokemon) will delete that particular Pokemon.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
