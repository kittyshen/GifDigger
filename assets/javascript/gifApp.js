/* 
# Gif digger
Pseudocode
Step1 select some game as topic subject and build an array for the game name.
Step2 render the buttons on the html with the game name fill in the text field of the buttons
Step3 formated a url accroding to giphy documentation, using the game name as variable.
Step4 call ajax link based on the url
Step5 inside the ajax call, process through those returned 10 objects
Step6 grab the img's url for still img and animated gif, the rating of the img and the title of the img maybe
Step7 render the html with a "for" loop, and render each frame of the gif object returned.
Step8 be sure to clear the html before ppl click another button
Step9 build a form in the html using bootstrap form
Step10 capture the form input value from the user input, push the value of string to the gameName[], and append another button to the button session of the page
Step11 at the same time start another ajax call according to user's input
*/