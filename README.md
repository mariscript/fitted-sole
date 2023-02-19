# Fitted Sole

Team:

* Marison - shoes
* Brian - hats

## Design

## Shoes microservice

Explain your models and integration with the wardrobe
microservice, here.

To create the shoes microservice, I referred to the Bin model in the Wardrobe microservice. The Bin model had the existing models to store the shoes in a closet in a bin. I created a BinVo in my models.py to correspond to the Bin in the Wardrobe microservice. The BinVo serves as a value object so the poller could pull the existing bin models in the wardrobe microservice. The Shoe Model includes the manufacturer, model name, color, picture url, and binVO in the wardrobe that uses a foreign key.


## Hats microservice

We created VOs to integrate with the wardrobe microservice. I added the location VO model to the hats microservice and imported from hats_rest.models into the hats poller.py file to loop over all locations in the list of JSON data and create or update location objects in the VO.
