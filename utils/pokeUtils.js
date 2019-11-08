import React from 'react';

const types = [
  {
    name: 'Normal',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/87beb1a1-f90b-4548-be40-01b6330931c5/d9mlg2i-eaa5e893-7f1f-448b-9e42-c95b956bed03.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg3YmViMWExLWY5MGItNDU0OC1iZTQwLTAxYjYzMzA5MzFjNVwvZDltbGcyaS1lYWE1ZTg5My03ZjFmLTQ0OGItOWU0Mi1jOTViOTU2YmVkMDMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.3ohTJf7kv3D1A9lmydz9YK-tmjIc49gVB7_jrPbb0Og',
  },
  {
    name: 'Fighting',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/87beb1a1-f90b-4548-be40-01b6330931c5/d9mlmgi-3338baff-6f1e-4e74-b243-a0a21d45509c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg3YmViMWExLWY5MGItNDU0OC1iZTQwLTAxYjYzMzA5MzFjNVwvZDltbG1naS0zMzM4YmFmZi02ZjFlLTRlNzQtYjI0My1hMGEyMWQ0NTUwOWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.lrMUqBC4-rVYwnS2mFwZUeUOKNCxowGIQ3svA3pZdKU',
  },
  {
    name: 'Flying',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/87beb1a1-f90b-4548-be40-01b6330931c5/d9mlmg2-83ac18a5-f583-4340-97b2-4c00fae65a03.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg3YmViMWExLWY5MGItNDU0OC1iZTQwLTAxYjYzMzA5MzFjNVwvZDltbG1nMi04M2FjMThhNS1mNTgzLTQzNDAtOTdiMi00YzAwZmFlNjVhMDMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.P6FwdYaq3uKGJp1aDMHl8TiR6Rk91p7jhuBbj6nPDi8',
  },
  {
    name: 'Poison',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/87beb1a1-f90b-4548-be40-01b6330931c5/d9mlg2b-1bc1fe60-982d-422d-a10e-eb2951977304.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg3YmViMWExLWY5MGItNDU0OC1iZTQwLTAxYjYzMzA5MzFjNVwvZDltbGcyYi0xYmMxZmU2MC05ODJkLTQyMmQtYTEwZS1lYjI5NTE5NzczMDQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ecuh-AaeWcibJjFu2Bg6LLbr1xv3y8Jq78QuKvEmUH0',
  },
  {
    name: 'Ground',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/87beb1a1-f90b-4548-be40-01b6330931c5/d9mlmf6-d6341bab-30e8-40aa-9bce-3f8a285c01d5.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg3YmViMWExLWY5MGItNDU0OC1iZTQwLTAxYjYzMzA5MzFjNVwvZDltbG1mNi1kNjM0MWJhYi0zMGU4LTQwYWEtOWJjZS0zZjhhMjg1YzAxZDUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.E-Katn3GPGnPlBvSgEQI6Ni3eCkQjKilkPl5Lcng8lc',
  },
  {
    name: 'Rock',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/87beb1a1-f90b-4548-be40-01b6330931c5/d9mlmen-38b4376f-911d-4600-8abb-74ea26bc95e4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg3YmViMWExLWY5MGItNDU0OC1iZTQwLTAxYjYzMzA5MzFjNVwvZDltbG1lbi0zOGI0Mzc2Zi05MTFkLTQ2MDAtOGFiYi03NGVhMjZiYzk1ZTQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.HF4h80pg-L4-Qn6cb5lMuUN181RhheXZorjyqhr_QVI',
  },
  {
    name: 'Bug',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/87beb1a1-f90b-4548-be40-01b6330931c5/d9mlmh3-c10ab3d0-f626-46f7-a6d6-62a9fbe1f485.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg3YmViMWExLWY5MGItNDU0OC1iZTQwLTAxYjYzMzA5MzFjNVwvZDltbG1oMy1jMTBhYjNkMC1mNjI2LTQ2ZjctYTZkNi02MmE5ZmJlMWY0ODUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.7o9pish-jUY3yJ8V2OMr6DpJix8LZOxZnRiQKRj1l3k',
  },
  {
    name: 'Ghost',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/87beb1a1-f90b-4548-be40-01b6330931c5/d9mlmfu-0b6861e5-3b90-4fcb-9209-3694d7be308c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg3YmViMWExLWY5MGItNDU0OC1iZTQwLTAxYjYzMzA5MzFjNVwvZDltbG1mdS0wYjY4NjFlNS0zYjkwLTRmY2ItOTIwOS0zNjk0ZDdiZTMwOGMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hSI5NEM0J9F9BDyLbj6rY3jyH76N2RMvWhGoC8TIBFA',
  },
  {
    name: 'Steel',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/87beb1a1-f90b-4548-be40-01b6330931c5/d9mlmed-8edc21ac-0b68-4482-a3d3-4ce5b994ff67.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg3YmViMWExLWY5MGItNDU0OC1iZTQwLTAxYjYzMzA5MzFjNVwvZDltbG1lZC04ZWRjMjFhYy0wYjY4LTQ0ODItYTNkMy00Y2U1Yjk5NGZmNjcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VVb6Zz2at40Hpb3TuPSGOCSBfHHEbo8vGvooQZNbV8U',
  },
  {
    name: 'Fire',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/87beb1a1-f90b-4548-be40-01b6330931c5/d9mlmg8-c87f884a-e707-45b9-8654-aae700a61eaf.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg3YmViMWExLWY5MGItNDU0OC1iZTQwLTAxYjYzMzA5MzFjNVwvZDltbG1nOC1jODdmODg0YS1lNzA3LTQ1YjktODY1NC1hYWU3MDBhNjFlYWYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.3jfBK24YdcuNKQtt12KRTj60BLF906O4cb37QahX1lI',
  },
  {
    name: 'Water',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/87beb1a1-f90b-4548-be40-01b6330931c5/d9mlmih-48f427bb-64ab-4af8-9d2e-c7852cf0ec7b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg3YmViMWExLWY5MGItNDU0OC1iZTQwLTAxYjYzMzA5MzFjNVwvZDltbG1paC00OGY0MjdiYi02NGFiLTRhZjgtOWQyZS1jNzg1MmNmMGVjN2IucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.iDryWg6KSpGMXq9Xz2A9MumS9FZmKbsnVW_PTh4Kw6c',
  },
  {
    name: 'Grass',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/87beb1a1-f90b-4548-be40-01b6330931c5/d9mlmfh-051ba61d-f303-42fa-b424-e907526f717d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg3YmViMWExLWY5MGItNDU0OC1iZTQwLTAxYjYzMzA5MzFjNVwvZDltbG1maC0wNTFiYTYxZC1mMzAzLTQyZmEtYjQyNC1lOTA3NTI2ZjcxN2QucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.SMe2c_3YfVUuQfLePzL9dGgHOpjwF-M7YxXzLyxLBDk',
  },
  {
    name: 'Electric',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/87beb1a1-f90b-4548-be40-01b6330931c5/d9mll7f-3ef97368-14a0-4b97-9a00-4f20f7a8b535.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg3YmViMWExLWY5MGItNDU0OC1iZTQwLTAxYjYzMzA5MzFjNVwvZDltbGw3Zi0zZWY5NzM2OC0xNGEwLTRiOTctOWEwMC00ZjIwZjdhOGI1MzUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.TrHrZcxVVrl5JFkjNmuKcjhGAhCAIZWsGlPUdLrSv4c',
  },
  {
    name: 'Psychic',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/87beb1a1-f90b-4548-be40-01b6330931c5/d9mlmer-5902e72a-b47a-45a1-974b-f94110317979.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg3YmViMWExLWY5MGItNDU0OC1iZTQwLTAxYjYzMzA5MzFjNVwvZDltbG1lci01OTAyZTcyYS1iNDdhLTQ1YTEtOTc0Yi1mOTQxMTAzMTc5NzkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.A7IX1yd1LfWcAYzt9w0uWNWnHoiqQeHODJi46QCTRnQ',
  },
  {
    name: 'Ice',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/87beb1a1-f90b-4548-be40-01b6330931c5/d9mlmex-5e80ca71-2a5c-4537-a698-847accb6eb8e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg3YmViMWExLWY5MGItNDU0OC1iZTQwLTAxYjYzMzA5MzFjNVwvZDltbG1leC01ZTgwY2E3MS0yYTVjLTQ1MzctYTY5OC04NDdhY2NiNmViOGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.nXHoHruCXdV633g7lR4_1DL6Gx6J_xCdbcnou-LseDI',
  },
  {
    name: 'Dragon',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/87beb1a1-f90b-4548-be40-01b6330931c5/d9mlg3i-1af912cc-800e-4610-bc4a-ec27fba461e3.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg3YmViMWExLWY5MGItNDU0OC1iZTQwLTAxYjYzMzA5MzFjNVwvZDltbGczaS0xYWY5MTJjYy04MDBlLTQ2MTAtYmM0YS1lYzI3ZmJhNDYxZTMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.FO_NXeHGX6LMPoHO5oxwcO8qGTJ2WSLR4tIk4CpZaH4',
  },
  {
    name: 'Dark',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/87beb1a1-f90b-4548-be40-01b6330931c5/d9mlmgx-e1c02e72-4e8f-4baf-836b-7d7f10d6289c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg3YmViMWExLWY5MGItNDU0OC1iZTQwLTAxYjYzMzA5MzFjNVwvZDltbG1neC1lMWMwMmU3Mi00ZThmLTRiYWYtODM2Yi03ZDdmMTBkNjI4OWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.FxSEFH8TKFhYUhbh8HJJwMKPRXy5p3YlalLx1GZfkX4',
  },
  {
    name: 'Fairy',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/87beb1a1-f90b-4548-be40-01b6330931c5/d9mlmgo-8fe7234d-51dc-4f15-b552-e44dcb3f62ac.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg3YmViMWExLWY5MGItNDU0OC1iZTQwLTAxYjYzMzA5MzFjNVwvZDltbG1nby04ZmU3MjM0ZC01MWRjLTRmMTUtYjU1Mi1lNDRkY2IzZjYyYWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.piJybvx6P4it96Mr4zuRqHCetnoz14MyIDOZPztggIQ',
  },
  {
    name: 'Unknown',
    image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/87beb1a1-f90b-4548-be40-01b6330931c5/dc72rny-552e59d9-a148-4cc5-ba7c-c7b019397f05.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg3YmViMWExLWY5MGItNDU0OC1iZTQwLTAxYjYzMzA5MzFjNVwvZGM3MnJueS01NTJlNTlkOS1hMTQ4LTRjYzUtYmE3Yy1jN2IwMTkzOTdmMDUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.RsASU1JvqjGDQ2_4HIYWDFpd9NOVSRqgRFGJ9Q3vJxE',
  }
];

export const getTypeData = id => types[id];

export const Type =  {
  Normal      : 0,
  Fighting    : 1,
  Flying      : 2,
  Poison      : 3,
  Ground      : 4,
  Rock        : 5,
  Bug         : 6,
  Ghost       : 7,
  Steel       : 8,
  Fire        : 9,
  Water       : 10,
  Grass       : 11,
  Electric    : 12,
  Psychic     : 13,
  Ice         : 14,
  Dragon      : 15,
  Dark        : 16,
  Fairy       : 17,
  Unknown     : 18
};

const StatusIcon = ({ color, label }) => (
  <span
    style={{
      color: "white",
      background: color,
      padding: '3px 5px',
      borderRadius:' 8px',
      margin: '0 5px',
    }}
  >{label}</span>
);

export const Status = {
  0: {
    name: 'growl',
    effects: [{
      name: '-50% Defense',
      isBoost: false
    }],
  },
  1: {
    name: 'focus',
    effects: [{
      name: 'x8 critical',
      isBoost: true
    }],
  },
  2: {
    name: 'hurricane',
    effects: [{
      name: 'Hurricane hit',
      isBoost: false
    }],
  },
  3: {
    name: 'poisoned',
    effects: [],
    icon: <StatusIcon label="POIS" color="purple" />,
  },
  4: {
    name: 'sandstorm',
    effects: [{
      name: 'Sandstorm hit',
      isBoost: false
    }],
  },
  5: {
    name: 'solid defense',
    effects: [{
      name: '+50% Defense',
      isBoost: true
    }],
  },
  6: {
    name: 'swarm',
    effects: [{
      name: 'Swarm hit',
      isBoost: false
    }],
  },
  7: {
    name: 'scared',
    effects: [{
      name: '-70% Attack',
      isBoost: false
    }],
    icon: <StatusIcon label="SCARED" color="blueviolet" />
  },
  8: {
    name: 'iron armor',
    effects: [{
      name: '+50% Sp. Defense',
      isBoost: true
    }],
  },
  9: {
    name: 'burn',
    effects: [{
      name: '-80% Attack',
      isBoost: false
    }],
    icon: <StatusIcon label="BURN" color="red" />
  },
  10: {
    name: 'soaked',effects: [{
      name: '-60% Speed',
      isBoost: false
    }, {
      name: '-80% Sp. Defense',
      isBoost: false
    }],
    icon: <StatusIcon label="SOAK" color="cornflowerblue" />
  },
  11: {
    name: 'leech seed',
    effects: [{
      name: 'Absorb HP',
      isBoost: false
    }],
  },
  12: {
    name: 'paralized',
    effects: [{
      name: '-60% Speed',
      isBoost: false
    }],
    icon: <StatusIcon label="PARAL" color="darkorange" />
  },
  13: {
    name: 'confused',
    effects: [],
    icon: <StatusIcon label="CONF" color="crimson" />
  },
  14: {
    name: 'frozen',
    effects: [{
      name: '-100% Speed',
      isBoost: false
    }],
    icon: <StatusIcon label="PARAL" color="lightblue" />
  },
  15: {
    name: 'dragon dance',
    effects: [{
      name: '+30% Attack',
      isBoost: true
    }, {
      name: '+30% Sp. Attack',
      isBoost: true
    }],
  },
  16: { // Dark, not in use
    name: '',
    effects: [/* ??? */],
  },
  17: {
    name: 'charm',
    effects: [],
    icon: <StatusIcon label="CHARM" color="hotpink" />
  },
  16: { // Unknown, not in use
    name: '',
    effects: [/* ??? */],
  },
}