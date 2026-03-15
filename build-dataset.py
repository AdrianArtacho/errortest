from music21 import converter

score = converter.parse("bach.mid")

for part in score.parts:
    measures = part.measures(1, None)

    for i in range(len(measures)-4):
        excerpt = measures[i:i+4]
        excerpt.write("musicxml", f"excerpts/excerpt_{i}.xml")