# visualdon-energy

L'histoire des énérgies - https://visualdon-energy.netlify.app/

## Contexte

Les données proviennent de Our World in Data (https://ourworldindata.org/energy) qui sont elles-mêmes issues de la BP Statistical Review of World Energy. (https://www.bp.com/en/global/corporate/energy-economics/statistical-review-of-world-energy.html).

Elle contient les données des années 1965 à 2021 de tous les pays du mondes.

## Description

Les données sont disponibles au format JSON et sont découpées par pays et par années.

Elles contiennent les informations de production et de consommation pour les différents types d'énérgies (électricité, gaz, pétrole, charbon, hydroélectricité, nucléaire, renouvelables, solaires, éoliens). Ainsi que les émissions de gaz à effet de serre.

ATTENTION :
- Quand une donnée n'est pas disponible, elle est remplacée par la valeur 0.
- Les données sont en TWh (Tera Watt Heure) et en tonnes de CO2.

### Préparation des données

Sur le fichier `.json` contenant les informations sur tous les pays du monde, je n'ai gardé que les informations sur la Suisse. Cela me permet d'avoir un fichier beaucoup moins lourd à charger dans le navigateur. 

```json
 "Switzerland": {
        "iso_code": "CHE",
        "data": [
            {
                "year": 2021,
                "population": 6341850,
                "biofuel_elec_per_capita": 0.0,
                "biofuel_electricity": 0.0,
                "biofuel_share_elec": 0.0,
                "carbon_intensity_elec": 544.3920288085938,
                "coal_cons_change_pct": 0.0,
                "coal_elec_per_capita": 0.0,
                "coal_electricity": 0.0,
                "coal_share_elec": 0.0,
                "electricity_demand": 18.200000762939453,
                "electricity_generation": 21.399999618530273,
                "electricity_share_energy": 4.800000190734863,
                "energy_cons_change_pct": 19.8439998626709,
                "energy_cons_change_twh": 73.81999969482422,
                "energy_per_capita": 70296.7890625,
                "fossil_cons_change_pct": 0.0,
                "fossil_elec_per_capita": 3374.409912109375,
                "fossil_electricity": 21.399999618530273,
                "fossil_share_elec": 100.0,
                "gas_cons_change_pct": 23.875,
                "gas_cons_change_twh": 70.7239990234375,
                "gas_consumption": 366.95098876953125,
                "gas_elec_per_capita": 2500.847900390625,
                "gas_electricity": 15.859999656677246,
                "gas_energy_per_capita": 57861.8203125,
                "gas_prod_change_pct": 20.100000381469727,
                "gas_prod_change_twh": 132.68899536132812,
                "gas_prod_per_capita": 125016.5078125,
                "gas_production": 792.8359985351562,
                "gas_share_elec": 74.11199951171875,
                "gas_share_energy": 82.31099700927734,
                "greenhouse_gas_emissions": 11.649999618530273,
                "hydro_cons_change_pct": 82.83200073242188,
                "hydro_cons_change_twh": 0.007000000216066837,
                "hydro_consumption": 0.014999999664723873,
                "hydro_elec_per_capita": 0.0,
                "hydro_electricity": 0.0,
                "hydro_energy_per_capita": 2.38700008392334,
                "hydro_share_elec": 0.0,
                "hydro_share_energy": 0.003000000026077032,
                "low_carbon_cons_change_pct": 25.64299964904785,
                "low_carbon_cons_change_twh": 0.007000000216066837,
                "low_carbon_consumption": 0.032999999821186066,
                "low_carbon_elec_per_capita": 0.0,
                "low_carbon_electricity": 0.0,
                "low_carbon_energy_per_capita": 5.260000228881836,
                "low_carbon_share_elec": 0.0,
                "low_carbon_share_energy": 0.007000000216066837,
                "net_elec_imports": -3.200000047683716,
                "net_elec_imports_share_demand": -17.582000732421875,
                "nuclear_elec_per_capita": 0.0,
                "nuclear_electricity": 0.0,
                "nuclear_share_elec": 0.0,
                "oil_cons_change_pct": 4.078000068664551,
                "oil_cons_change_twh": 3.0889999866485596,
                "oil_consumption": 78.8270034790039,
                "oil_elec_per_capita": 873.56201171875,
                "oil_electricity": 5.539999961853027,
                "oil_energy_per_capita": 12429.70703125,
                "oil_prod_change_pct": 15.222000122070312,
                "oil_prod_change_twh": 18.41200065612793,
                "oil_prod_per_capita": 21977.02734375,
                "oil_production": 139.375,
                "oil_share_elec": 25.88800048828125,
                "oil_share_energy": 17.68199920654297,
                "other_renewable_consumption": 0.0,
                "other_renewable_electricity": 0.0,
                "other_renewable_exc_biofuel_electricity": 0.0,
                "other_renewables_cons_change_twh": 0.0,
                "other_renewables_elec_per_capita": 0.0,
                "other_renewables_elec_per_capita_exc_biofuel": 0.0,
                "other_renewables_energy_per_capita": 0.0,
                "other_renewables_share_elec": 0.0,
                "other_renewables_share_elec_exc_biofuel": 0.0,
                "other_renewables_share_energy": 0.0,
                "per_capita_electricity": 3374.409912109375,
                "primary_energy_consumption": 445.81201171875,
                "renewables_cons_change_pct": 25.64299964904785,
                "renewables_cons_change_twh": 0.007000000216066837,
                "renewables_consumption": 0.032999999821186066,
                "renewables_elec_per_capita": 0.0,
                "renewables_electricity": 0.0,
                "renewables_energy_per_capita": 5.260000228881836,
                "renewables_share_elec": 0.0,
                "renewables_share_energy": 0.007000000216066837,
                "solar_cons_change_pct": -0.27300000190734863,
                "solar_cons_change_twh": -0.0,
                "solar_consumption": 0.017999999225139618,
                "solar_elec_per_capita": 0.0,
                "solar_electricity": 0.0,
                "solar_energy_per_capita": 2.872999906539917,
                "solar_share_elec": 0.0,
                "solar_share_energy": 0.004000000189989805,
                "wind_cons_change_twh": 0.0,
                "wind_consumption": 0.0,
                "wind_elec_per_capita": 0.0,
                "wind_electricity": 0.0,
                "wind_energy_per_capita": 0.0,
                "wind_share_elec": 0.0,
                "wind_share_energy": 0.0
            }
        ]
```

Pour la carte des centrales nucléaires suisse, j'ai créé un fichier au format `.geojson` contenant les coordonnées des 5 centrales; récupéré sur Wikipédia.

```json

{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "Power station": "Leibstadt",
        "MW": 1220,
        "# Units": 1
      },
      "geometry": {
        "type": "Point",
        "coordinates": [8.18472, 47.60306]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "Power station": "Beznau I et II",
        "MW": 365,
        "# Units": 2
      },
      "geometry": {
        "type": "Point",
        "coordinates": [8.5, 47.3]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "Power station": "Gösgen",
        "MW": 1035,
        "# Units": 1
      },
      "geometry": {
        "type": "Point",
        "coordinates": [7.9680556, 47.3663889]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "Power station": "Mühleberg",
        "MW": 335,
        "# Units": 1
      },
      "geometry": {
        "type": "Point",
        "coordinates": [7.268, 46.9653]
      }
    }
  ]
}
```

## But

Face à la crise énergétique, que connaît l'Europe, il est difficile de comprendre notre situation, afin de mieux comprendre toute cette histoire, il faut analyser notre lien avec l'énergie.

Le but de ce projet est d'expliquer l'évolution de la consommation d'énergie, de l'énergie produits, et l'évolution des sources d'énergies.

## Références

- Office fédéral de l'énergie - Dashboard de l'énergie Suisse (https://energiedashboard.admin.ch/dashboard)
- Les explorateurs de l'énergie (https://www.explorateurs-energie.ch/)

## Wireframe

![Wireframe](./assets/images/wireframe.png)
