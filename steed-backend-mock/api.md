## API Base
https://steed-api.steed-intel.com/

## headers
token will be returned by aws cognito
`qwertyui` is the debug token for development

```
{
    'token':'qwertyui',
    'Content-Type': 'application/json'
}
```

## ? POST /api/submit_user_details 

req:
```
{
    'suburb': 'Docklands',
    'property_type': 'Townhouse'
}
```

resp: 
```
SUCCESS, ERROR, Authentication Error
{
    'message': str
}
```

## GET /api/get_properties

resp:
```
{
    'matched': [
        {
<!--             'cadastreType': 'Polygon',
            
            'addressCoordinate': {'lat': -34.92131, 'lon': 138.52788},
            'addressId': 9962264,
            'features': [
                'Air Conditioning',
                'Barbeque',
                'Courtyard',
                'Fireplace',
                'Pool',
                'Rumpur Room',
                'Study'
            ],
            'flatNumber': '',
            'gnafIds': [{'monthNo': 11, 'yearNo': 2020, 'gnafPID': 'GASA_415164774'}],
            'isResidential': True,
            'photos': [
                {'imageType': 'Property',
                'advertId': 2016914242,
                'date': '2021-04-21T00:35:22.05Z',
                'fullUrl': 'https://bucket-api.domain.com.au/v1/bucket/image/2016914242_1_1_210406_051501-w3901-h2600',
                'rank': 1},
            ],
            'planNumber': 'D4604',
            'postcode': '5032',

            'propertyCategoryId': 1,
            'state': 'SA',
            'streetAddress': '3 Castlebar Road',
            'streetName': 'Castlebar',
            'streetNumber': '3',
            'streetType': 'Rd',
            'streetTypeLong': 'Road',
            'suburb': 'Lockleys',
            'suburbId': 8925,
            -->

            '_id': 'YI-0097-WU'
            'bathrooms': 2,
            'bedrooms': 4,
            'carSpaces': 6,
            'address': '3 Castlebar Road, Lockleys SA 5032',
            'short_address': 'Lockleys SA 5032',
            'sold_date':'07/07/2020',
            'short_sold_date':'May 2020',
            'areaSize': 861,
            'landsize': 570,
            'headline': 'Magnificent Estate Metres from the Beach',
            'summaryDescription': 'On approximately 800 sqm, this welcoming period home, beautifully maintained and set in mature gardens, offers relaxed family living in a tightly-held precinct close to the Yarra, walking paths and primary and secondary schools.',
            'min_price': 1000000,
            'max_price': 1200000,
            'propertyType':'House'
        }
    ]
}
```

## POST /api/make_prediction

req: 
```
{
    'prop_id': 'YI-0097-WU',
    'prediction': 1100000,
}
```

resp:
```
{
    'accuracy':0.983,
    'points':230,
    'sold_price': 1340000,
    'sold_date':'21-05-2020',
    'description': 'Setellar performance again Warren. You are one of the top predictors in this category. Kudos!',
    'total_points': 1355,
    'rank':9,
    'avg_accuracy': 0.84
}
or
{
    'message': 'Prediction Failed'
}
```

## GET /api/fetch_user_profile

resp:
```
{
    'current_month':{
        'points':456, 
        'leadboard_position':9,
        'accuracy':0.76
    },
    'all_time':{
        'points':1234,
        'leadboard_position':10,
        'accuracy':0.87
    },
    'points_hist':{
        'highest_points':509,
        'average_points':300,
        'total_redeemed':459,
        'hist':[
            345, 509, 102, 342, 230, 120， 349
        ]
    },
    'badges':[
        {
            'id':'bid1',
            'name':'The Toorak King',
            'description':'Highest accuracy on Toorak homes',
            'accuracy':0.87,
            'date':"17/04/2021",
            'achieved':true
        },
        {
            'id':'bid2',
            'name':'Sydney Savvy',
            'description':'No one prediction Sydney homes like you',
            'accuracy':0.87,
            'achieved':false     // badge is white color
        }
    ],
    'impact':{
        'house': 47,
        'townhouse': 9, 
        'unit': 13, 
    }   
}
```

## GET /api/leaderboard

resp:
```
{
    'overall': [
        {
            'name': 'Bowen', 
            'rank': 1,
            'points':11980
            'badges': [
                'bid1', 
                'bid2'
            ]
        },
        {
            'name': 'Bowen2', 
            'rank': 2,
            'badges': [
                'bid1', 
            ]
        },
        {
            'name': 'Bowen3', 
            'rank': 3,
            'badges': [
                'bid2', 
            ]
        },
        {
            'name': 'Bowen4', 
            'rank': 4,
            'badges': [
                'bid1', 
            ]
        },
        {
            'name': 'Bowen5', 
            'rank': 5,
            'badges': [
            ]
        },
        {
            'name': 'Bowen6', 
            'rank': 6,
            'badges': [
            ]
        },
        {
            'name': 'Bowen7', 
            'rank': 7,
            'badges': [
            ]
        },
        {
            'name': 'Bowen8', 
            'rank': 8,
            'badges': [
            ]
        },
        {
            'name': 'Bowen9', 
            'rank': 9,
            'badges': [
            ]
        },
        {
            'name': 'Bowen10', 
            'rank': 10,
            'badges': [
            ]
        }
    ],
    'current_month': [
        {
            'name': 'Bowen', 
            'rank': 1,
            'badges': [
                'bid1', 
                'bid2'
            ]
        },
        {
            'name': 'Bowen2', 
            'rank': 2,
            'badges': [
                'bid1', 
            ]
        },
        {
            'name': 'Bowen3', 
            'rank': 3,
            'badges': [
                'bid2', 
            ]
        },
        {
            'name': 'Bowen4', 
            'rank': 4,
            'badges': [
                'bid1', 
            ]
        },
        {
            'name': 'Bowen5', 
            'rank': 5,
            'badges': [
            ]
        },
        {
            'name': 'Bowen6', 
            'rank': 6,
            'badges': [
            ]
        },
        {
            'name': 'Bowen7', 
            'rank': 7,
            'badges': [
            ]
        },
        {
            'name': 'Bowen8', 
            'rank': 8,
            'badges': [
            ]
        },
        {
            'name': 'Bowen9', 
            'rank': 9,
            'badges': [
            ]
        },
        {
            'name': 'Bowen10', 
            'rank': 10,
            'badges': [
            ]
        }
    ],

}
```

## POST /api/bonus
```
{
    'bonus_type': 'first_login'
}
```
bonus_type: ('first_login', 'first_game', 'five_games', 'ten_games')


# Icons
[https://github.com/google/material-design-icons/releases/tag/1.0.0]

# Wireframe
[https://www.figma.com/file/lP4B6tOTMISP6LU1EyDVdM/SteedPunt-Final-Design?node-id=1097%3A10877]


# Badges  - we should include a progress bar to attract users
1. {house_type} Expert: top 10 predictors for a house type in (unit, house, townhouse)
2. (Progress bar) The {Suburb} King: top 3 predictors for a suburb with minimum 10 game in that suburb played(select only hot suburbs, based on avaialbe data points)
3. (Progress bar) The {suburb} Hero: finish all games for a suburb
4. (Hot Start, Deadeye, Clutch Shooter): First on 1st/2nd/3rd monthly leaderboard
5. OAA(One Above All): collector of all (Hot start, Deadeye, clutch Shooter)

# Bonus events
1. Each game perfect guess will get (0-300)
2. Login reward: 5
3. Daily first game reward: 5
4. 5 games in a row reward: 5
5. 10 games in a day reward: 5

# Instruction Text
1. We create the challenges: The Steed Punt app creates challenges for you to participate in
2. You predict the sale price: You answer by predicting the last sold prices. The properties will be recently sold. Every challenge you pick will have a clock you play against. Submit your punt and get instant results
3. You get Rewarded: You will be given your result immediately with a consolidated score and leaderboard position vs other players. Earn mor points to win prizes.

# Property Icons
Rooms / Toilet / Parking / Land size / Internal size 
