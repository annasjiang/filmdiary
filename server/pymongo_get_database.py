from tmdbv3api import TMDb
from tmdbv3api import Movie
tmdb = TMDb()
tmdb.api_key = 'dbc0a6d62448554c27b6167ef7dabb1b'
tmdb.language = 'en'
tmdb.debug = True

from pymongo import MongoClient
import sys
import pandas as pd

CONNECTION_STRING = "mongodb+srv://giddyroddy:giddyroddy@cluster0.4vid1ei.mongodb.net/test"
   
client = MongoClient(CONNECTION_STRING)
db = client.filmdiary
collection = db.reviews
df = collection
watched = collection.find()

liked = df.find({
    'rating' : {"$gt" : '3'}
})

movie = Movie()
film_ids = liked
liked_ids = film_ids.distinct('filmid')
recs = []

for i in liked_ids:
  if (movie.recommendations(movie_id=i)):
    for j in movie.recommendations(movie_id=i):
      recs.append(j)

watched_list = watched.distinct('filmid')
rec_list = []

for r in recs:
  rec_list.append(str(r.id))

a = watched_list
b = rec_list

id_filtered = [x for x in b if x not in a]

final_title = []
final_poster = []
final_id = []
final_vote = []

for i in id_filtered:
  x = movie.details(i)
  final_title.append(x.title)
  final_poster.append(x.poster_path)
  final_id.append(x.id)
  final_vote.append(x.vote_average)

final_df = pd.DataFrame({'name': final_title, 'poster': final_poster, 'filmid': final_id, 'vote': final_vote})
final_df['occurences'] = final_df.groupby('filmid')['filmid'].transform('size')
cleaned_df = final_df.drop_duplicates(keep='first')
sorted_occ = cleaned_df.sort_values(by=['occurences'], ascending=False).iloc[:20]
sorted_pop = sorted_occ.sort_values(by=['vote'], ascending=False)
mongo_df = sorted_pop.drop(['vote', 'occurences'], axis=1)

display(mongo_df)

rec_db = db['recs']
rec_db.drop()
rec_db.insert_many(mongo_df.to_dict('recs'))

sys.stdout. flush()