from PIL import Image

img_path = r"C:\Users\yugra\.gemini\antigravity-ide\brain\daa17ff2-e194-46dc-98f4-2c48866d5979\elder_wand_1781600527694.png"
img = Image.open(img_path).convert("RGBA")
data = img.getdata()

new_data = []
# we want to make white background transparent, but the wand might have bright spots.
# let's be careful. Pure white or near pure white
for item in data:
    if item[0] > 245 and item[1] > 245 and item[2] > 245:
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append(item)

img.putdata(new_data)
# Now let's find the bounding box to crop it tightly to the top-left
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

img.save(r"C:\new portfolio\portfolio\public\wand.png", "PNG")
print("Done saving wand.png")
