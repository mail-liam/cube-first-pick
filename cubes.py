names = ["uncommon_cube", "stevens_pauper_cube"]
cubes = {}

for cube in names:
    filename = f"{cube}.txt"
    with open(filename) as file:
        cubes[cube] = [line.strip().split("|")[0].replace(" ", "_") for line in file]
