# ppg.com

> Pure plant gains nutrient optimizer

## Some thoughts so far

We need to think about this a bit if we want to eventually expand this:

Here's our collections so far:

UserSchema
UserSettingSchema

Okay User stuff, so that's fine. Need that. Good to seperate the user and settings
because we'll have more than one setting per user (one nutrient profile per UserSetting)
So maybe we should be calling this UserNutrientProfileSchema? makes it more clear and better
seperation of concerns

Now this is where it's kind of fucked.
We have a few things to consider here.
We have a food item. A food item is just its name and some description.
That food item has nutrients associated with it. So at its rawest form,
this app can work with just food and the nutrient documents that go with it.
FoodSchema
NutrientSchema (NutrientDefinitionSchema ye ye we need the def so that we just need to reference an id in nutrient)
also, the nutrients are kept as values of X per 100g and Y per 100kcal
FoodGroupSchema (we also have food group but not too important right now but good to keep in the fold)

Easy so far right.

That brings us to the next portion which makes this a bit more tricky.

When someone goes to the optimizer part, we want them to be able to add food to a list of
foods right. so we'll have some kind of array of foods, which then references the nutrients we need to do our calcs
easy so far. at this point we don't really need any more collections.

what if they want to save this list of food for another time?
Okay, let's make a model called Collection
I think it can have the following fields:
* name: ''
* foodItems: []

That's probably all we actually need you would think right?
But you forget one catch, we can't just have a list of foods and call it a day because we 
also want to allow people to save the settings from the optimization?
what if it was separated somehow then? for example, if you just had the above and also
a different collection that was in charge of saving those settings

RecipeSchema
OptimizerItemSchema
CollectionSchema