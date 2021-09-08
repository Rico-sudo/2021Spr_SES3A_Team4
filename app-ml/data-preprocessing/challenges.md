# David - 07/09/21

A number of challenges were faced by Myself and Alberico this week to prepare our dataset for training the model.
Upon downloading the dataset(https://www.aicrowd.com/challenges/snakeclef2021-snake-species-identification-challenge/dataset_files), we realised that:

1. None of the images were organised into files
2. All images were random / different sizes
3. There was a different number of images per snake

This would make training the model difficult, so I helped manipulate the training labels and png files into useable data.

The first problem was overcome through using the command:
`FOR /F "delims=" %N in (list.txt) do COPY "%N" C:\Destination`

However, to achieve this I had to manpulate the existing `TrainVal` labels from https://www.aicrowd.com/challenges/snakeclef2021-snake-species-identification-challenge/dataset_files into a txt file just containing their png names.

I used Excel to manipulate the data into the following files:
[Boiga Irregularis](BoigaIrregularis.txt)
[Dendrelaphis Punctulatus](DendrelaphisPunctulatus.txt)
[Morelia Spilota](MoreliaSpilota.txt)
[Notechis Scutatus](NotechisScutatus.txt)
[Pseudechis Porphyriacus](PseudechisPorphyriacus.txt)
[Pseudonaja Textilis](PseudonajaTextilis.txt)

The second problem was overcome through batch resizing all images.

Finally the number of images per snake were equalised (to 426 per snake, to ensure the model did not have any bias)

## Selected Snakes

We decided to use the 6 most commonly encountered snakes in Austalia (with varying deadliness) to begin training our model. This was to ensure that best accuracy was met.

High threat snakes:
- Pseudechis porphyriacus (Red-bellied black snake)
- Notechis Scutatus (Tiger snake)
- Pseudonaja Textilis (Eastern brown snake)

Low threat snakes:
- Boiga Irregularis (Brown tree snake - only mildly venomous, so classified as not a threat to humans)
- Morelia Spilota (Carpet Python)
- Dendrelaphis Punctulatus (Green Tree Snake / Common Tree Snake)


