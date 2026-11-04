---
title: "Restanse - Arrears"
layout: default
---

<div class="language-content lang-en" markdown="1">

# Arrears

> **Draft – first iteration.** This is not a final API specification. Ambita has proposed these messages because we deliver the data to the broker and Vitec Next. Fields may still change.

The broker needs to know about outstanding arrears on the unit before settling the sale. Ambita sends an arrears request to the accountant on behalf of the broker, and the accountant responds with outstanding amounts, payment information and any debt collection cases.

<div class="mermaid">
flowchart LR
  ambita([AMBITA]) --> arrearsReq["7.1.0<br/>Arrears request"]
  arrearsReq --> accountant([ACCOUNTANT])
  accountant --> arrearsRes["7.2.0<br/>Arrears result"]
  arrearsRes --> ambita

classDef actor fill:#ffcc00,stroke:#0a0f0f,stroke-width:1px,color:#000;
classDef request fill:#00ccff,stroke:#0a0f0f,stroke-width:1px,color:#000;
classDef response fill:#33dd33,stroke:#0a0f0f,stroke-width:1px,color:#000;
class ambita,accountant actor;
class arrearsReq request;
class arrearsRes response;
</div>

## When the request is sent

The request is sent when all of these are met:

* Arrears requests are enabled at Ambita for the accountant.
* The sales message has been sent and processed: `salgsmeldingfullfort` has been received, or Ambita has marked the sales message as completed (no right of first refusal or board approval, or these are not handled by the accountant).
* If the accountant handles board approval and/or right of first refusal, these are clarified: `statusStyregodkjenning` and `statusForkjopsrett` are set in `salgsmeldingfullfort`. If they are not handled by the accountant (`handteresAvForretningsforer: false`), this does not apply.

The request is sent automatically when the transfer date is reached. If the transfer date changes ([change transfer date](endring-overdragelsesdato.md)), the request is moved accordingly. The broker can also order arrears manually as soon as the conditions above are met.

Each request has its own `ordreId`. The latest result received is the one that applies.

## Arrears request

```json
{
  "type": "restanse",
  "ordreId": "7a1c2f90-5b3e-4c1d-9f2a-1e8b7c6d5e4f",
  "estateId": "8227867c-7cee-45dd-b7dd-63d2f93bce23",
  "oppdragsnummer": "8-0148/26",
  "registerenhet": {
    "type": "matrikkel",
    "ident": "3802-71-119-0-21"
  },
  "bestiller": {
    "id": "TBF",
    "navn": "Broker Doe",
    "epost": "tbf@domene.no",
    "telefon": "79119911"
  },
  "meglerkontor": {
    "orgnr": "987654323",
    "avdelingsnr": "3",
    "navn": "Avdeling3",
    "adresse": {
      "gateadresse": "Testvei 3",
      "postnummer": "0030",
      "poststed": "OSLO"
    },
    "telefon": "12345678"
  },
  "kontaktperson": {
    "id": "AO",
    "navn": "Anne Olsen",
    "epost": "aol@domene.no",
    "telefon": "12548630"
  },
  "salgsmeldingOrdreId": "60dbe743-3edf-44f4-92e5-0922dd82ba6e",
  "datoOverdragelse": "2026-11-01T12:00:00+01:00"
}
```

### Additional fields specific for arrears requests

For common request fields see [boliginformasjon](boliginformasjon.md#request-fields-that-are-in-all-requests)

* salgsmeldingOrdreId - Reference to the sales message order ID, so the accountant can link the request to the ownership transfer case
* datoOverdragelse - The transfer date as registered on the broker's assignment

## Arrears result

The result contains all outstanding claims, due or not yet due, calculated for the date in `beregnetDato`. The latest result received is the one that applies.

```json
{
  "ordreId": "7a1c2f90-5b3e-4c1d-9f2a-1e8b7c6d5e4f",
  "type": "restanseresultat",
  "forretningsforer": {
    "navn": "UNTL",
    "adresse": {
      "gateadresse": "Postboks 112 Lier",
      "postnummer": "0501",
      "poststed": "Oslo"
    },
    "epost": "post@kunde.no",
    "epostRestanse": "restanse@kunde.no"
  },
  "klient": {
    "klienttype": "Borettslag tilknyttet",
    "organisasjonsnavn": "Skauen Borettslag",
    "organisasjonsnummer": "948677202"
  },
  "levert": "2026-11-01T06:15:03.7537667+00:00",
  "referanse": "622/1",
  "eierform": "Andelseier",
  "beregnetDato": "2026-11-01",
  "merknad": "Standard text from the accountant about arrears.",
  "restanserBoligselskap": {
    "felleskostnader": [
      {
        "kravtype": "hjemmelskrav",
        "fakturanummer": "100234",
        "kid": "0012345678901",
        "fakturadato": "2026-09-15",
        "forfallsdato": "2026-10-01",
        "periodeFra": "2026-10-01",
        "periodeTil": "2026-10-31",
        "nettobelop": 3800.00,
        "mvaBelop": 0.00,
        "utestaende": 3800.00,
        "forfalt": true
      },
      {
        "kravtype": "annet",
        "fakturanummer": "100235",
        "kid": "0012345678919",
        "fakturadato": "2026-09-15",
        "forfallsdato": "2026-10-01",
        "periodeFra": "2026-10-01",
        "periodeTil": "2026-10-31",
        "nettobelop": 450.00,
        "mvaBelop": 0.00,
        "utestaende": 450.00,
        "forfalt": true
      }
    ],
    "andreKostnader": [
      {
        "kravtype": "annet",
        "kategori": "energi",
        "beskrivelse": "Fjernvarme 3. kvartal",
        "fakturanummer": "100411",
        "kid": "0012345678927",
        "fakturadato": "2026-10-05",
        "forfallsdato": "2026-10-20",
        "periodeFra": "2026-07-01",
        "periodeTil": "2026-09-30",
        "nettobelop": 1250.00,
        "mvaBelop": 312.50,
        "utestaende": 1562.50,
        "forfalt": true
      }
    ],
    "betalingsinformasjon": {
      "totalsum": 5812.50,
      "sumHjemmelskrav": 3800.00,
      "sumAndreKrav": 2012.50,
      "kontonummer": "15032012345",
      "kid": "0012345678927",
      "forfallsdato": "2026-10-01"
    }
  },
  "inkasso": {
    "saker": [
      {
        "saksnummer": "INK-2026-0042",
        "belop": 4250.00,
        "inkassoselskap": {
          "navn": "Inkasso AS",
          "telefon": "22000000",
          "epost": "post@inkasso.no"
        }
      }
    ]
  },
  "restanserForretningsforer": {
    "gebyrer": [
      {
        "gebyrtype": "eierskiftegebyr",
        "beskrivelse": "Gebyr eierskifte",
        "fakturanummer": "200118",
        "kid": "0098765432103",
        "forfallsdato": "2026-11-15",
        "nettobelop": 4000.00,
        "mvaBelop": 1000.00,
        "utestaende": 5000.00
      }
    ],
    "betalingsinformasjon": {
      "totalsum": 5000.00,
      "sumHjemmelskrav": 0.00,
      "sumAndreKrav": 5000.00,
      "kontonummer": "15032054321",
      "kid": "0098765432103",
      "forfallsdato": "2026-11-15"
    }
  }
}
```

### Response fields specific for arrears results

* beregnetDato - The date the arrears are calculated for
* merknad - Standard text from the accountant, shown to the broker (optional)
* restanserBoligselskap - Outstanding claims to the housing company
  * felleskostnader - Outstanding common costs (can be empty)
  * andreKostnader - Other outstanding costs, e.g. energy and capital calls (can be empty)
  * betalingsinformasjon - Payment information for the housing company
* inkasso - Debt collection cases (optional, only present when claims have been sent to debt collection)
* restanserForretningsforer - Fees owed to the accountant (optional, under clarification and can be omitted)

#### Claims in felleskostnader and andreKostnader

* kravtype - `hjemmelskrav` or `annet`
* fakturanummer - Invoice number in the accountant's system
* kid - KID for the claim (optional)
* fakturadato - Invoice date
* forfallsdato - Due date
* periodeFra / periodeTil - The period the claim covers
* kategori - Category, e.g. `energi` or `kapitalinnkalling` (optional, used for andreKostnader)
* beskrivelse - Description from the accountant's system (optional, used for andreKostnader)
* nettobelop / mvaBelop - Net amount and VAT in NOK
* utestaende - Remaining amount to pay on the claim (partial payment is supported)
* forfalt - true if the due date has passed

#### betalingsinformasjon

* totalsum - Sum of `utestaende` for all claims the broker is to pay. Claims under debt collection are not included
* sumHjemmelskrav - Sum of claims with kravtype `hjemmelskrav`
* sumAndreKrav - Sum of claims with kravtype `annet`
* kontonummer - Account number (11 digits)
* kid - KID for the combined payment (optional)
* forfallsdato - Due date for the combined payment

The broker pays all claims to each recipient as one combined payment. The accountant distributes the payment between the claims.

#### inkasso.saker

* saksnummer - Case number at the debt collection company
* belop - Principal sent to debt collection (optional)
* inkassoselskap - Debt collection company: navn, telefon (optional) and epost (optional)

Claims under debt collection are only listed here and are settled directly with the debt collection company.

#### restanserForretningsforer.gebyrer

* gebyrtype - One of `forhandsutlysingsgebyr`, `eierskiftegebyr`, `administrasjonsgebyr`, `noteringsgebyr` or `transportgebyr`
* beskrivelse - Free text (optional)
* fakturanummer - Invoice number in the accountant's system
* kid - KID for the fee (optional)
* forfallsdato - Due date
* nettobelop / mvaBelop / utestaende - Amounts in NOK

`betalingsinformasjon` for the fees has the same format as for the housing company.

If the arrears cannot be delivered electronically, the accountant responds with a [feil](feilmeldinger.md) message instead, e.g. code 33 `manuellBehandling`.

</div>

<div class="language-content lang-no" lang="no" markdown="1">

# Restanse

> **Utkast – første iterasjon.** Dette er ikke en endelig API-spesifikasjon. Ambita har laget forslaget fordi vi skal levere dataene til megler og Vitec Next. Felt kan fortsatt endres.

Megler må vite om det er utestående restanse på enheten før oppgjøret. Ambita sender en restanseforespørsel til forretningsfører på vegne av megler, og forretningsfører svarer med utestående beløp, betalingsinformasjon og eventuelle inkassosaker.

<div class="mermaid">
flowchart LR
  ambita([AMBITA]) --> arrearsReq["7.1.0<br/>Bestilling: restanse"]
  arrearsReq --> accountant([FORRETNINGSFØRER])
  accountant --> arrearsRes["7.2.0<br/>Svar: restanseresultat"]
  arrearsRes --> ambita

classDef actor fill:#ffcc00,stroke:#0a0f0f,stroke-width:1px,color:#000;
classDef request fill:#00ccff,stroke:#0a0f0f,stroke-width:1px,color:#000;
classDef response fill:#33dd33,stroke:#0a0f0f,stroke-width:1px,color:#000;
class ambita,accountant actor;
class arrearsReq request;
class arrearsRes response;
</div>

## Når forespørselen sendes

Forespørselen sendes når alt dette er oppfylt:

* Restanse er aktivert hos Ambita for forretningsfører.
* Salgsmeldingen er sendt og behandlet: `salgsmeldingfullfort` er mottatt, eller Ambita har satt salgsmeldingen som fullført (uten forkjøpsrett eller styregodkjenning, eller der disse ikke håndteres av forretningsfører).
* Håndterer forretningsfører styregodkjenning og/eller forkjøpsrett, må disse være avklart: `statusStyregodkjenning` og `statusForkjopsrett` er satt i `salgsmeldingfullfort`. Håndteres de ikke av forretningsfører (`handteresAvForretningsforer: false`), gjelder ikke kravet.

Forespørselen sendes automatisk når overtakelsesdatoen er nådd. Endres overtakelsesdatoen ([endring overdragelsesdato](endring-overdragelsesdato.md)), flyttes utsendingen tilsvarende. Megler kan også bestille restanse manuelt så snart forutsetningene over er oppfylt.

Hver forespørsel har egen `ordreId`. Siste mottatte resultat er gjeldende.

## Forespørsel om restanse

```json
{
  "type": "restanse",
  "ordreId": "7a1c2f90-5b3e-4c1d-9f2a-1e8b7c6d5e4f",
  "estateId": "8227867c-7cee-45dd-b7dd-63d2f93bce23",
  "oppdragsnummer": "8-0148/26",
  "registerenhet": {
    "type": "matrikkel",
    "ident": "3802-71-119-0-21"
  },
  "bestiller": {
    "id": "TBF",
    "navn": "Broker Doe",
    "epost": "tbf@domene.no",
    "telefon": "79119911"
  },
  "meglerkontor": {
    "orgnr": "987654323",
    "avdelingsnr": "3",
    "navn": "Avdeling3",
    "adresse": {
      "gateadresse": "Testvei 3",
      "postnummer": "0030",
      "poststed": "OSLO"
    },
    "telefon": "12345678"
  },
  "kontaktperson": {
    "id": "AO",
    "navn": "Anne Olsen",
    "epost": "aol@domene.no",
    "telefon": "12548630"
  },
  "salgsmeldingOrdreId": "60dbe743-3edf-44f4-92e5-0922dd82ba6e",
  "datoOverdragelse": "2026-11-01T12:00:00+01:00"
}
```

### Tilleggsfelter for restanse

Felles felter for forespørsler er beskrevet under [boliginformasjon](boliginformasjon.md#request-fields-that-are-in-all-requests)

* salgsmeldingOrdreId – referanse til salgsmelding-ordren, slik at forretningsfører kan koble forespørselen til eierskiftesaken
* datoOverdragelse – overtakelsesdato slik den står på megleroppdraget

## Restanseresultat

Resultatet inneholder alle utestående krav, forfalte og ikke forfalte, beregnet for datoen i `beregnetDato`. Siste mottatte resultat er gjeldende.

```json
{
  "ordreId": "7a1c2f90-5b3e-4c1d-9f2a-1e8b7c6d5e4f",
  "type": "restanseresultat",
  "forretningsforer": {
    "navn": "UNTL",
    "adresse": {
      "gateadresse": "Postboks 112 Lier",
      "postnummer": "0501",
      "poststed": "Oslo"
    },
    "epost": "post@kunde.no",
    "epostRestanse": "restanse@kunde.no"
  },
  "klient": {
    "klienttype": "Borettslag tilknyttet",
    "organisasjonsnavn": "Skauen Borettslag",
    "organisasjonsnummer": "948677202"
  },
  "levert": "2026-11-01T06:15:03.7537667+00:00",
  "referanse": "622/1",
  "eierform": "Andelseier",
  "beregnetDato": "2026-11-01",
  "merknad": "Standardtekst fra forretningsfører om restanse.",
  "restanserBoligselskap": {
    "felleskostnader": [
      {
        "kravtype": "hjemmelskrav",
        "fakturanummer": "100234",
        "kid": "0012345678901",
        "fakturadato": "2026-09-15",
        "forfallsdato": "2026-10-01",
        "periodeFra": "2026-10-01",
        "periodeTil": "2026-10-31",
        "nettobelop": 3800.00,
        "mvaBelop": 0.00,
        "utestaende": 3800.00,
        "forfalt": true
      },
      {
        "kravtype": "annet",
        "fakturanummer": "100235",
        "kid": "0012345678919",
        "fakturadato": "2026-09-15",
        "forfallsdato": "2026-10-01",
        "periodeFra": "2026-10-01",
        "periodeTil": "2026-10-31",
        "nettobelop": 450.00,
        "mvaBelop": 0.00,
        "utestaende": 450.00,
        "forfalt": true
      }
    ],
    "andreKostnader": [
      {
        "kravtype": "annet",
        "kategori": "energi",
        "beskrivelse": "Fjernvarme 3. kvartal",
        "fakturanummer": "100411",
        "kid": "0012345678927",
        "fakturadato": "2026-10-05",
        "forfallsdato": "2026-10-20",
        "periodeFra": "2026-07-01",
        "periodeTil": "2026-09-30",
        "nettobelop": 1250.00,
        "mvaBelop": 312.50,
        "utestaende": 1562.50,
        "forfalt": true
      }
    ],
    "betalingsinformasjon": {
      "totalsum": 5812.50,
      "sumHjemmelskrav": 3800.00,
      "sumAndreKrav": 2012.50,
      "kontonummer": "15032012345",
      "kid": "0012345678927",
      "forfallsdato": "2026-10-01"
    }
  },
  "inkasso": {
    "saker": [
      {
        "saksnummer": "INK-2026-0042",
        "belop": 4250.00,
        "inkassoselskap": {
          "navn": "Inkasso AS",
          "telefon": "22000000",
          "epost": "post@inkasso.no"
        }
      }
    ]
  },
  "restanserForretningsforer": {
    "gebyrer": [
      {
        "gebyrtype": "eierskiftegebyr",
        "beskrivelse": "Gebyr eierskifte",
        "fakturanummer": "200118",
        "kid": "0098765432103",
        "forfallsdato": "2026-11-15",
        "nettobelop": 4000.00,
        "mvaBelop": 1000.00,
        "utestaende": 5000.00
      }
    ],
    "betalingsinformasjon": {
      "totalsum": 5000.00,
      "sumHjemmelskrav": 0.00,
      "sumAndreKrav": 5000.00,
      "kontonummer": "15032054321",
      "kid": "0098765432103",
      "forfallsdato": "2026-11-15"
    }
  }
}
```

### Felter i restanseresultatet

* beregnetDato – datoen restansen er beregnet for
* merknad – standardtekst fra forretningsfører som vises megler (valgfritt)
* restanserBoligselskap – utestående krav til boligselskapet
  * felleskostnader – utestående felleskostnader (kan være tom)
  * andreKostnader – andre utestående kostnader, f.eks. energi og kapitalinnkallinger (kan være tom)
  * betalingsinformasjon – betalingsinformasjon for boligselskapet
* inkasso – inkassosaker (valgfritt, bare med når krav er sendt til inkasso)
* restanserForretningsforer – gebyrer til forretningsfører (valgfritt, under avklaring og kan utelates)

#### Krav i felleskostnader og andreKostnader

* kravtype – `hjemmelskrav` eller `annet`
* fakturanummer – fakturanummer i fagsystemet
* kid – KID for kravet (valgfritt)
* fakturadato – fakturadato
* forfallsdato – forfallsdato
* periodeFra / periodeTil – perioden kravet gjelder
* kategori – kategori, f.eks. `energi` eller `kapitalinnkalling` (valgfritt, brukes for andreKostnader)
* beskrivelse – varebeskrivelse fra fagsystemet (valgfritt, brukes for andreKostnader)
* nettobelop / mvaBelop – nettobeløp og mva i NOK
* utestaende – gjenstående å betale på kravet (delbetaling støttes)
* forfalt – sann hvis forfallsdatoen er passert

#### betalingsinformasjon

* totalsum – sum av `utestaende` for alle krav megler skal betale. Krav under inkasso er ikke med
* sumHjemmelskrav – sum av krav med kravtype `hjemmelskrav`
* sumAndreKrav – sum av krav med kravtype `annet`
* kontonummer – kontonummer (11 siffer)
* kid – KID for samlet innbetaling (valgfritt)
* forfallsdato – forfallsdato for samlet innbetaling

Megler betaler alle krav til hver mottaker samlet. Forretningsfører fordeler innbetalingen på kravene.

#### inkasso.saker

* saksnummer – saksnummer hos inkassoselskapet
* belop – hovedstol som er sendt til inkasso (valgfritt)
* inkassoselskap – inkassoselskap: navn, telefon (valgfritt) og epost (valgfritt)

Krav under inkasso listes bare her og gjøres opp direkte med inkassoselskapet.

#### restanserForretningsforer.gebyrer

* gebyrtype – en av `forhandsutlysingsgebyr`, `eierskiftegebyr`, `administrasjonsgebyr`, `noteringsgebyr` eller `transportgebyr`
* beskrivelse – fritekst (valgfritt)
* fakturanummer – fakturanummer i fagsystemet
* kid – KID for gebyret (valgfritt)
* forfallsdato – forfallsdato
* nettobelop / mvaBelop / utestaende – beløp i NOK

`betalingsinformasjon` for gebyrene har samme format som for boligselskapet.

Kan restansen ikke leveres elektronisk, svarer forretningsfører med en [feil](feilmeldinger.md)-melding i stedet, f.eks. kode 33 `manuellBehandling`.

</div>
