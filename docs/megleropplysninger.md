---
title: "Megleropplysninger - Broker Information"
layout: default
---

<div class="language-content lang-en" markdown="1">

# Broker Information

Megleropplysninger is a product that allows brokers to request object data for delivery from the accountant. This product provides information that the accountant maintains about the property, which can be useful for the broker during the sales process.

The property information is delivered in the `objektData` field of the callback. It is a fully specified structure that mirrors OnProperty's `BrokerPropertyInformation` record — every field is named and typed. The complete field reference is in the objektData section below.

<div class="mermaid">
flowchart LR
  ambita([AMBITA]) --> infoReq["6.1.0<br/>Broker information request"]
  infoReq --> accountant([ACCOUNTANT])
  accountant --> infoRes["6.1.1<br/>Broker information response"]
  infoRes --> ambita

classDef actor fill:#ffcc00,stroke:#0a0f0f,stroke-width:1px,color:#000;
classDef request fill:#00ccff,stroke:#0a0f0f,stroke-width:1px,color:#000;
classDef response fill:#33dd33,stroke:#0a0f0f,stroke-width:1px,color:#000;
class ambita,accountant actor;
class infoReq request;
class infoRes response;
</div>

## Broker information request

On behalf of the broker the following request is made:

```json
{
  "type": "megleropplysninger",
  "ordreId": "1888e14e-1418-4d37-b3be-0d0b623681ba",
  "estateId": "8edbaf12-7e21-4cf7-8d72-74277d004c32",
  "oppdragsnummer": "8-0148/23",
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
  }
}
```

### Request fields

The Megleropplysninger request uses the same basic structure as other product requests. For detailed field explanations see [common request fields](boliginformasjon.md#request-fields-that-are-in-all-requests).

The request contains only the basic required fields:
* type - Set to "megleropplysninger"
* All standard BasicProduct fields (ordreId, registerenhet, bestiller, meglerkontor, kontaktperson)

## Broker information response

The accountant responds with object data for the specified property. The example below is shortened — the lists that can hold many entries (`monthlyExpenses`, `noteCategoryGroups[].notes`) show only some of their entries:

```json
{
  "type": "megleropplysninger",
  "ordreId": "1888e14e-1418-4d37-b3be-0d0b623681ba",
  "objektData": {
    "orderId": "61714442-d250-4434-ad50-a3c6954f8f1e",
    "taskId": 78910,
    "registeredDate": "2025-01-01T12:00:00+01:00",
    "realEstate": {
      "realEstateId": 1,
      "realEstateCode": "RE123",
      "landNumber": 456,
      "titleNumber": 789,
      "unitTypeNumber": "01",
      "unitNumber": 10,
      "shareUnitNumber": "42",
      "address": {
        "street": "Hovedgata 1",
        "zipCode": "1234",
        "city": "OSLO"
      },
      "councilNumber": "0301",
      "councilName": "OSLO",
      "initialPayment": 650000.0
    },
    "accountingClient": {
      "name": "Eksempel Borettslag",
      "organizationNumber": "987654321",
      "accountingClientType": "HousingCooperative",
      "emailAddress": "kontakt@eksempel.no",
      "associatedBBL": true,
      "isFirstRefusalRights": false,
      "managementApproval": true,
      "firstRefusalRightOption": 2,
      "firstRefusalResponsible": 1,
      "managementApprovalOption": 1
    },
    "accountant": {
      "name": "Regnskapsfører AS",
      "address": {
        "street": "Regnskapsgata 10",
        "zipCode": "4321",
        "city": "Stavanger"
      },
      "emailAddress": "info@regnskapsforer.no",
      "telephone": "51999999"
    },
    "taxAssessment": {
      "year": "2024",
      "totalIncome": 500000,
      "totalExpense": 200000,
      "totalDebt": 100000,
      "totalFortune": 200000
    },
    "insurances": [
      {
        "policyNr": "INS12345",
        "dateFrom": "2023-01-01T00:00:00+01:00",
        "dateTo": "2025-05-01T00:00:00+02:00",
        "typeDescription": "Bygningsforsikring",
        "companyName": "Trygge rammer"
      }
    ],
    "loans": [
      {
        "loanNumber": "5906-1",
        "loanDescription": "Fellesgjeld DNB",
        "loanAmount": 25000000.0,
        "termsInYear": 12,
        "interestType": "Fast",
        "dueDate": "2029-05-31T00:00:00+02:00",
        "startDate": "2019-06-01T00:00:00+02:00",
        "inLoan": false,
        "maturity": 120,
        "currentRate": 3.25,
        "loanTypeDescription": "Boliglån",
        "mortgageeName": "DNB Bank ASA",
        "balance": 20000000.0,
        "balanceDate": "2025-10-31T00:00:00+01:00",
        "noInstalmentStartPeriod": "2025-01-01T00:00:00+01:00",
        "noInstalmentEndPeriod": "2025-12-31T00:00:00+01:00",
        "realEstate": {
          "fraction": 0.0125,
          "balance": 250000.0,
          "hasIndividualPaymentPlan": true,
          "monthlyInstalmentAmount": 0.0,
          "monthlyInterestAmount": 677.08,
          "monthlyCapitalCostsAmount": 677.08,
          "monthlyInstalmentAmountAfterNoInstalment": 2500.0,
          "monthlyInterestAmountAfterNoInstalment": 750.0,
          "monthlyCapitalCostsAmountAfterNoInstalment": 3250.0
        }
      },
      {
        "loanNumber": "9001-1",
        "loanDescription": "Garasjelån",
        "loanAmount": 35000000.0,
        "termsInYear": 12,
        "redemptionDate": "2052-02-28T00:00:00+01:00",
        "interestType": "Flytende",
        "dueDate": "2022-04-30T00:00:00+02:00",
        "startDate": "2022-03-01T00:00:00+01:00",
        "inLoan": true,
        "maturity": 360,
        "currentRate": 4.5,
        "futureRate": 4.75,
        "loanTypeDescription": "Boliglån",
        "mortgageeName": "Nordea Bank",
        "balance": 30200000.0,
        "balanceDate": "2024-10-31T00:00:00+01:00",
        "realEstate": {
          "fraction": 1.0,
          "balance": 30200000.0,
          "hasIndividualPaymentPlan": false,
          "monthlyCapitalCostsAmount": 20888.89
        }
      }
    ],
    "monthlyExpenses": [
      {
        "productCode": "STROM",
        "productDescription": "Strøm",
        "invoiceProfile": "Kvartalsvis",
        "productPrice": 1500.50,
        "futureProductPrices": [
          {
            "price": 1600.0,
            "activeFrom": "2025-02-01T00:00:00+01:00"
          }
        ]
      },
      {
        "productCode": "80",
        "productDescription": "Akonto renter",
        "invoiceProfile": "Månedlig",
        "productPrice": 947.02,
        "loanNumber": "2242"
      },
      {
        "productCode": "KABELTV",
        "productDescription": "Kabel-TV",
        "invoiceProfile": "Årlig",
        "futureProductPrices": [
          {
            "price": 210.0,
            "activeFrom": "2025-07-01T00:00:00+02:00"
          }
        ]
      }
    ],
    "mortgages": [
      {
        "mortgagorName": "Ola Nordmann",
        "mortgageDate": "2020-01-15T00:00:00+01:00",
        "dischargeDate": "2050-01-15T00:00:00+01:00",
        "dueDate": "2025-02-01T00:00:00+01:00",
        "reference": "Ref001",
        "mortgageType": "Pantelån",
        "priority": 1,
        "mortgageeNo": "12345678",
        "mortgageeName": "Nordea",
        "mortgageValue": 3000000.0,
        "mortgageNote": "Hovedbolig"
      },
      {
        "mortgagorName": "Ola Nordmann",
        "mortgageDate": "2020-01-15T00:00:00+01:00",
        "reference": "Ref002",
        "mortgageType": "Avtalepant",
        "priority": 2,
        "mortgageeNo": "12345678",
        "mortgageeName": "Nordea",
        "mortgageValue": 0.0,
        "mortgageValueDescription": "Ubegrenset",
        "mortgageNote": "Uten beløpsbegrensning"
      }
    ],
    "contractGuarantees": [
      {
        "guaranteeType": "Bankgaranti",
        "amount": 100000.0,
        "fromDate": "2023-01-01T00:00:00+01:00",
        "toDate": "2024-01-01T00:00:00+01:00",
        "bankAccountNumber": "1234 5678 9123",
        "company": "Sparebank1",
        "notes": "Sikkerhetsgaranti",
        "notificationDate": "2023-12-01T00:00:00+01:00"
      }
    ],
    "currentOwners": [
      {
        "firstName": "Kari",
        "lastName": "Nordmann",
        "fullname": "Kari Nordmann",
        "address": {
          "street": "Hovedgata 1",
          "zipCode": "1234",
          "city": "OSLO"
        },
        "isCoOwner": false,
        "ownershipFraction": {
          "numerator": 3,
          "denominator": 5
        }
      },
      {
        "firstName": "Birger",
        "lastName": "Nordmann",
        "fullname": "Birger Nordmann",
        "address": {
          "street": "Hovedgata 1",
          "zipCode": "1234",
          "city": "OSLO"
        },
        "isCoOwner": true,
        "ownershipFraction": {
          "numerator": 2,
          "denominator": 5
        }
      }
    ],
    "noteCategoryGroups": [
      {
        "noteCategoryGroupId": 2,
        "noteCategoryGroupDescription": "Parkering/Garasje",
        "notes": [
          {
            "noteId": 5678,
            "noteCategoryId": 21,
            "noteCategoryDescription": "DIV1",
            "text": "Parkering i gata"
          }
        ]
      }
    ],
    "valueDocuments": [
      {
        "valueDocumentType": "Aksjer",
        "faceValue": 1000.0,
        "numberSeries": "A-001 til A-010",
        "valueDocumentLocation": "Forretningsfører",
        "comment": "10 aksjer pålydende 100,-"
      }
    ],
    "broker": "Hans Megler",
    "brokerRef": "BR123",
    "chairman": {
      "name": "Ola Nordmann",
      "emailAddress": "styreleder@email.com",
      "phoneNumber": "81553337"
    },
    "accountManager": {
      "name": "Kari Rådgiver",
      "emailAddress": "radgiver@obos.no"
    }
  },
  "forretningsforer": {
    "navn": "UNTL",
    "adresse": {
      "gateadresse": "Postboks 112 Lier",
      "postnummer": "0501",
      "poststed": "Oslo"
    },
    "epost": "post@kunde.no"
  },
  "klient": {
    "klienttype": "Borettslag tilknyttet",
    "organisasjonsnavn": "Skauen Borettslag",
    "organisasjonsnummer": "948677202",
    "epost": "styret@brl.no",
    "styreleder": {
      "navn": "Ole Styreleder",
      "epost": "leder@brl.no",
      "telefonnr": "99889988"
    }
  },
  "levert": "2022-07-07T15:48:07.6328836Z",
  "referanse": "622/1",
  "eierform": "Seksjonseier"
}
```

### Response fields

The response includes all standard callback fields plus:

* **objektData** - The property information itself. A fully specified structure, described field by field in the objektData section below.
* **type** - Message type identifier ("megleropplysninger")
* **ordreId** - The order ID from the request
* **forretningsforer** (accountant) - Information about the accountant handling this property
  * navn (name) - Company name
  * adresse (address) - Address of the company
  * epost (email) - Email to the company
* **klient** - Information about the property owner organization
  * klienttype (client type) - The type of client
  * organisasjonsnavn (organization name) - The client's name
  * organisasjonsnummer (organization number) - The client's organization number
  * epost (email) - Email to the client
  * styreleder (chairperson) - The person leading the board
    * navn (name) - Chairperson's name
    * epost (email) - Chairperson's email address
    * telefonnr (phone number) - Chairperson's phone number
* **levert** (delivered) - Timestamp when the response was created
* **referanse** (reference) - Accountant's internal reference
* **eierform** (ownership type) - Type of ownership (Andelseier, Seksjonseier, Aksjonær)

When our system receives this message, it will make the broker information available to the broker system.

## objektData

`objektData` mirrors OnProperty's `BrokerPropertyInformation` record. Serialization:

* Property names are camelCase
* Null values are omitted from the JSON (`WhenWritingNull`) — an optional field is either present with a value, or absent altogether. Check for presence rather than for `null`.
* Enums are serialized as strings (for example `HousingCooperative`)
* Dates use ISO 8601 / RFC 3339 (for example `2025-01-01T12:00:00+01:00`), and may include a time zone offset and fractional seconds

### Top level

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| orderId | string | No | Unique identifier supplied when the broker information was ordered. |
| taskId | integer | No | The order's case id in ON Property. |
| registeredDate | date-time | No | When the information was delivered. |
| realEstate | RealEstate | No | Detailed information about the property. |
| accountingClient | AccountingClient | No | Information about the housing company. |
| accountant | Accountant | No | Information about the property manager. |
| taxAssessment | TaxAssessment | Yes | Third-party tax information for the property, for the most recent available year. |
| insurances | array of Insurance | Yes | Insurance policies. |
| loans | array of Loan | Yes | Loans belonging to the housing company. See the note under Loan. |
| monthlyExpenses | array of MonthlyExpense | No | Monthly expenses. |
| mortgages | array of Mortgage | Yes | Mortgage deeds on the property. |
| contractGuarantees | array of ContractGuarantee | Yes | Contract guarantees. |
| currentOwners | array of Contact | No | Current owners of the property. |
| noteCategoryGroups | array of NoteCategoryGroup | Yes | Note groups with the notes attached to the housing company. |
| valueDocuments | array of ValueDocument | Yes | References to value documents attached to properties in housing stock companies (boligaksjeselskap). |
| broker | string | Yes | Name of the broker who placed the order. |
| brokerRef | string | Yes | Reference information for the broker. |
| chairman | Chairman | Yes | Information about the chairperson of the board. |
| accountManager | AccountManager | Yes | Information about the adviser (account manager) at the property manager. |

### RealEstate

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| realEstateId | integer | No | Unique identifier for the property in ON Property. |
| realEstateCode | string | Yes | Code representing the property. |
| landNumber | integer | Yes | Gårdsnummer (land number). |
| titleNumber | integer | Yes | Bruksnummer (title number). |
| unitTypeNumber | string | Yes | Seksjonsnummer (section number). |
| unitNumber | integer | Yes | Festenummer (leasehold number). |
| shareUnitNumber | string | Yes | Aksjeboenhetsnummer. Only present when the company type is Boligaksjeselskap. |
| address | Address | No | Address of the property. |
| councilNumber | string | Yes | Municipality number. |
| councilName | string | Yes | Municipality name. |
| initialPayment | number | Yes | Borettsinnskudd (initial payment for the share). |

### AccountingClient

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| name | string | No | Name of the housing company. |
| organizationNumber | string | No | Organization number of the housing company. |
| accountingClientType | AccountingClientType | No | Type of accounting client. |
| emailAddress | string | Yes | Email address of the accounting client. |
| associatedBBL | boolean | No | Whether the property is associated with a BBL. |
| isFirstRefusalRights | boolean | No | Whether a right of first refusal exists. |
| managementApproval | boolean | No | Whether board approval is required. |
| firstRefusalRightOption | integer | Yes | Type of right of first refusal. 1 = can be pre-announced, 2 = internal with advance clarification, 3 = internal without advance clarification, 4 = no advance clarification, 5 = internal. |
| firstRefusalResponsible | integer | Yes | Who clarifies the right of first refusal. 1 = property manager, 2 = the board. |
| managementApprovalOption | integer | Yes | Who is responsible for clarifying board approval. 1 = the board, 2 = property manager, 3 = broker. |

### AccountingClientType (enum)

Serialized as the string name, for example `HousingCooperative`.

| Value | Name | Description |
| --- | --- | --- |
| 0 | Other | Annet |
| 1 | JointStockCompany | Boligaksjeselskap |
| 2 | HousingCooperative | Borettslag |
| 3 | JointOwnership | Sameie |
| 4 | Foundation | Stiftelse |
| 5 | CoOperativeBuildingSociety | Boligbyggelag |
| 7 | Rentals | Utleie |
| 8 | Cooperative | Aksjeselskap |
| 9 | BusinessLimitedCompany | Næringsaksjeselskap |
| 10 | HeatingCentral | Varmesentral |
| 11 | GroundskeeperCentral | Vaktmestersentral |
| 12 | JointGarage | Garasjelag |
| 13 | JointOutside | Utomhus |
| 14 | JointRoad | Veilag |
| 15 | OperatingAssociation | Driftsforening |
| 16 | WelfareAssociation | Velforening |
| 17 | HomeownersAssociation | Huseierforening |
| 18 | SectionedJointOwnership | Eierseksjonsameie |
| 19 | LimitedPartnership | Komandittselskap |
| 20 | ResponsibleCompany | Ansvarligselskap |
| 21 | CooperationCooperative | Samvirkeforetak |
| 22 | DistrictCourtOwnership | Tingsrettsligsameie |

### Accountant

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| name | string | No | Name of the property manager. |
| address | Address | No | Address of the property manager. |
| emailAddress | string | Yes | Email address of the property manager. |
| telephone | string | Yes | Phone number of the property manager. |

### Chairman

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| name | string | No | Full name of the chairperson. |
| emailAddress | string | Yes | Email address of the chairperson, when available. |
| phoneNumber | string | Yes | Phone number of the chairperson, when available. Note that the chairperson uses `phoneNumber` while the property manager uses `telephone`. |

### AccountManager

The adviser (account manager) at the property manager.

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| name | string | No | Full name of the adviser. |
| emailAddress | string | Yes | Email address of the adviser, when available. |

### Address

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| street | string | No | Street address. |
| zipCode | string | No | Postal code. |
| city | string | No | City / place. |

### TaxAssessment

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| year | string | No | Assessment year. |
| totalIncome | integer | No | Total income. |
| totalExpense | integer | No | Total expenses. |
| totalDebt | integer | No | Total debt. |
| totalFortune | integer | No | Total assets. |

### Insurance

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| policyNr | string | No | Policy number. |
| dateFrom | date-time | No | Start date of the policy. |
| dateTo | date-time | Yes | End date of the policy. |
| typeDescription | string | No | Description of the insurance type. |
| companyName | string | No | Name of the insurance company. |

### Loan

Loans with a balance of 0.00 are omitted from `loans`, even when the loan is still active. The list is sorted ascending by `startDate` (oldest first).

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| loanNumber | string | Yes | Loan number. Can be missing, so do not use it alone as a key. |
| loanDescription | string | Yes | Loan description. |
| loanAmount | number | No | Original loan amount. |
| termsInYear | integer | No | Number of terms per year. |
| redemptionDate | date-time | Yes | Redemption date. |
| interestType | string | Yes | Interest type (Flytende / Fast). |
| dueDate | date-time | Yes | Next due date from the payment plan. Missing when there is no future term. |
| startDate | date-time | Yes | Start date of the loan / payout date. |
| inLoan | boolean | No | Whether the loan is an InLoan (true) or a common loan (false). |
| maturity | integer | No | Term in months. |
| currentRate | number | Yes | Current interest rate (%). |
| futureRate | number | Yes | Future interest rate (%), when one is known. |
| loanTypeDescription | string | Yes | Loan type description. |
| mortgageeName | string | Yes | Name of the mortgagee / lender. |
| balance | number | No | Total balance of the loan. |
| balanceDate | date-time | No | Date of the balance (last voucher date from the general ledger). |
| noInstalmentStartPeriod | date-time | Yes | Start date of the interest-only (no instalment) period. |
| noInstalmentEndPeriod | date-time | Yes | End date of the interest-only (no instalment) period. |
| realEstate | LoanRealEstate | Yes | The property's share of the loan. Only present when the property takes part in the loan. |

### LoanRealEstate

**Splitting instalments and interest requires an individual payment plan.** When `hasIndividualPaymentPlan` is `true`, instalment, interest and capital cost are presented separately. When it is `false`, **only** `monthlyCapitalCostsAmount` and, where relevant, `monthlyCapitalCostsAmountAfterNoInstalment` are presented; the instalment and interest fields are omitted.

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| fraction | number | No | The property's fractional share of the loan (same for InLoan and common loans). |
| balance | number | No | The property's share of the balance (total balance × fraction). |
| hasIndividualPaymentPlan | boolean | No | True when the amounts come from an individual payment plan, in which case instalment and interest are split out. False means only the capital cost is set. |
| monthlyInstalmentAmount | number | Yes | The property's monthly instalment. Only with an individual payment plan. |
| monthlyInterestAmount | number | Yes | The property's monthly interest. Only with an individual payment plan. |
| monthlyCapitalCostsAmount | number | Yes | The property's total monthly capital costs. |
| monthlyInstalmentAmountAfterNoInstalment | number | Yes | The property's monthly instalment after the interest-only period. Only with an individual payment plan. |
| monthlyInterestAmountAfterNoInstalment | number | Yes | The property's monthly interest after the interest-only period. Only with an individual payment plan. |
| monthlyCapitalCostsAmountAfterNoInstalment | number | Yes | The property's monthly capital costs after the interest-only period. |

### MonthlyExpense

**Important – `productPrice` is ALWAYS a monthly amount, regardless of how often the item is invoiced.** `invoiceProfile` says how often the item is invoiced. The actual invoiced amount = `productPrice` × the number of months between invoices:

| invoiceProfile | Invoiced | Invoiced amount |
| --- | --- | --- |
| Månedlig | every month | `productPrice` × 1 |
| Annenhver måned | every 2nd month | `productPrice` × 2 |
| Kvartalsvis | every quarter | `productPrice` × 3 |
| Halvårlig | every 6 months | `productPrice` × 6 |
| Årlig | once a year | `productPrice` × 12 |
| Manuell | manually | – |

Example: `invoiceProfile = "Kvartalsvis"` with `productPrice = 500` means 500 per month, invoiced as 1500 every quarter. The same applies to `futureProductPrices[].price`.

`productPrice` can be missing entirely when the item only has a future price, so treat a missing value as 0 when summing.

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| productCode | string | No | Product code. For traceability only; not guaranteed to be unique. |
| productDescription | string | No | Name of the product / cost type. |
| invoiceProfile | string | No | How often the item is invoiced, as Norwegian text: "Månedlig", "Annenhver måned", "Kvartalsvis", "Halvårlig", "Årlig" or "Manuell". Controls the multiplier for the invoiced amount (see the note above). |
| productPrice | number | Yes | **Monthly price** – always an amount per month, regardless of `invoiceProfile`. Multiply by the number of months between invoices to get the invoiced amount. Can be missing when the item only has a future price. |
| loanNumber | string | Yes | Loan number when the item can be tied to a specific loan (for example à-konto instalments or interest). Taken from the contract's loan dimension or from an individual payment plan. Omitted when the item cannot be tied to a loan. |
| futureProductPrices | array of FutureProductPrice | Yes | Future prices for the product. |

### FutureProductPrice

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| price | number | No | Future **monthly price** (same meaning as `productPrice` – always per month). |
| activeFrom | date-time | No | Date from which the price applies. |
| activeTo | date-time | Yes | Date until which the price applies. |

### Mortgage

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| mortgagorName | string | No | Name of the mortgagor. |
| mortgageDate | date-time | Yes | Date of the mortgage deed. |
| dischargeDate | date-time | Yes | Discharge date. |
| dueDate | date-time | Yes | Due date. |
| reference | string | No | Reference. |
| mortgageType | string | No | Mortgage type (for example Pantelån). |
| priority | integer | Yes | Priority. |
| mortgageeNo | string | No | Mortgagee number. |
| mortgageeName | string | No | Mortgagee name. |
| mortgageValue | number | Yes | Mortgage value. |
| mortgageValueDescription | string | Yes | "Ubegrenset" (unlimited) when `mortgageValue` is 0, meaning a mortgage without an amount limit. |
| mortgageNote | string | No | Note attached to the mortgage. |

### ContractGuarantee

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| guaranteeType | string | Yes | Type of guarantee. |
| amount | number | Yes | Guarantee amount. |
| fromDate | date-time | Yes | Start date. |
| toDate | date-time | Yes | End date. |
| bankAccountNumber | string | Yes | Bank account number. |
| company | string | Yes | Company. |
| notes | string | Yes | Notes. |
| notificationDate | date-time | Yes | Notification date. |

### Contact

Used for `currentOwners`.

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| isCoOwner | boolean | No | True = co-owner, false = owner on the contract (invoice recipient). |
| firstName | string | Yes | First name of the owner / name of a legal entity owner. |
| lastName | string | Yes | Last name of the owner / blank for a legal entity owner. |
| fullname | string | Yes | Composed full name (first name or organization name + last name). |
| address | Address | Yes | Address of the owner. |
| ownershipFraction | OwnershipFraction | Yes | Ownership share as a simplified fraction. Specified shares are kept, the rest is divided equally between the remaining owners. |

### OwnershipFraction

`ownershipFraction` is a simplified fraction with integer numerator and denominator (1/3), not a percentage with decimals (33.34 + 33.33 + 33.33).

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| numerator | integer | No | Numerator of the ownership fraction. |
| denominator | integer | No | Denominator of the ownership fraction. |

### NoteCategoryGroup

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| noteCategoryGroupId | integer | No | Id of the note category group. A predefined list, see the table below. |
| noteCategoryGroupDescription | string | No | Description of the group. |
| notes | array of Note | No | Notes attached to this category. |

### Note

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| noteId | integer | No | Id of the note. For traceability only. |
| noteCategoryId | integer | No | Id of the category. |
| noteCategoryDescription | string | No | Code / name of the note category. |
| text | string | No | The note text itself. |

### Note category groups

| noteCategoryGroupId | noteCategoryGroupDescription |
| --- | --- |
| 1 | Generelt |
| 2 | Parkering |
| 3 | Dyrehold |
| 4 | Lån |
| 5 | Felleskostnader |
| 6 | TV |
| 7 | Særlig forhold |
| 8 | Rehabilitering |
| 9 | Energi |
| 10 | Internett |
| 11 | Vaktmester |
| 12 | Eiendomskatt |
| 13 | Sikringsordning |
| 14 | Andre objekter / fasiliteter |
| 15 | Forkjøpsrett |
| 16 | Styregodkjenning |

### ValueDocument

Value documents attached to a property in a housing stock company (boligaksjeselskap).

| Field | Type | Optional | Description |
| --- | --- | --- | --- |
| valueDocumentType | string | No | Type of value document, for example shares, bond or promissory note. |
| faceValue | number | No | Face value of the document (amount). |
| numberSeries | string | Yes | Number / series reference for the document. |
| valueDocumentLocation | string | No | Where the document is kept (property manager, mortgagee, shareholder and so on). |
| comment | string | Yes | Additional information about the document. |

## Usage Notes

* This is an independent product that can be ordered at any time
* No special processing or approval workflows are involved
* `objektData` is a fully specified structure, not an open key-value map
* Optional fields are omitted entirely when they have no value, so check for presence rather than for `null`
* Amounts in `monthlyExpenses` and in `loans[].realEstate` are monthly amounts. For monthly expenses the invoiced amount is `productPrice` multiplied by the number of months between invoices
* Loans with a balance of 0.00 are omitted from `loans` even when they are still active, and `loans` is sorted ascending by `startDate` (oldest first)
* Instalments and interest are only split out when `hasIndividualPaymentPlan` is `true`; otherwise only the capital cost is presented
* `ownershipFraction` is a simplified fraction (1/3), not a percentage with decimals (33.34 + 33.33 + 33.33)
* For comprehensive property information, use [Boliginformasjon](boliginformasjon.md) instead

</div>

<div class="language-content lang-no" lang="no" markdown="1">

# Megleropplysninger

Megleropplysninger er et produkt som lar megler bestille objektdata til levering fra forretningsfører. Produktet gir informasjon som forretningsfører har om eiendommen, og som kan være nyttig for megler i salgsarbeidet.

Eiendomsopplysningene leveres i feltet `objektData` i callbacken. Det er en fullt spesifisert struktur som speiler OnProperty sin `BrokerPropertyInformation`-record – alle felter er navngitt og typet. Fullstendig feltbeskrivelse finner du i objektData-seksjonen nedenfor.

<div class="mermaid">
flowchart LR
  ambita([AMBITA]) --> infoReq["6.1.0<br/>Bestilling: megleropplysninger"]
  infoReq --> accountant([FORRETNINGSFØRER])
  accountant --> infoRes["6.1.1<br/>Svar: megleropplysninger"]
  infoRes --> ambita

classDef actor fill:#ffcc00,stroke:#0a0f0f,stroke-width:1px,color:#000;
classDef request fill:#00ccff,stroke:#0a0f0f,stroke-width:1px,color:#000;
classDef response fill:#33dd33,stroke:#0a0f0f,stroke-width:1px,color:#000;
class ambita,accountant actor;
class infoReq request;
class infoRes response;
</div>

## Forespørsel om megleropplysninger

På vegne av megler sendes følgende forespørsel:

```json
{
  "type": "megleropplysninger",
  "ordreId": "1888e14e-1418-4d37-b3be-0d0b623681ba",
  "estateId": "8edbaf12-7e21-4cf7-8d72-74277d004c32",
  "oppdragsnummer": "8-0148/23",
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
  }
}
```

### Felt i forespørselen

Megleropplysninger-forespørselen bruker samme grunnstruktur som andre produktmeldinger. Detaljert feltsbeskrivelse finner du under [felles felter for forespørsler](boliginformasjon.md#request-fields-that-are-in-all-requests).

Forespørselen inneholder kun de obligatoriske basisfeltene:
* type – skal settes til "megleropplysninger"
* Alle standard felter i BasicProduct (ordreId, registerenhet, bestiller, meglerkontor, kontaktperson)

## Svar med megleropplysninger

Forretningsfører svarer med objektdata for angitt eiendom. Eksempelet under er forkortet – listene som kan inneholde mange elementer (`monthlyExpenses`, `noteCategoryGroups[].notes`) viser bare noen av elementene:

```json
{
  "type": "megleropplysninger",
  "ordreId": "1888e14e-1418-4d37-b3be-0d0b623681ba",
  "objektData": {
    "orderId": "61714442-d250-4434-ad50-a3c6954f8f1e",
    "taskId": 78910,
    "registeredDate": "2025-01-01T12:00:00+01:00",
    "realEstate": {
      "realEstateId": 1,
      "realEstateCode": "RE123",
      "landNumber": 456,
      "titleNumber": 789,
      "unitTypeNumber": "01",
      "unitNumber": 10,
      "shareUnitNumber": "42",
      "address": {
        "street": "Hovedgata 1",
        "zipCode": "1234",
        "city": "OSLO"
      },
      "councilNumber": "0301",
      "councilName": "OSLO",
      "initialPayment": 650000.0
    },
    "accountingClient": {
      "name": "Eksempel Borettslag",
      "organizationNumber": "987654321",
      "accountingClientType": "HousingCooperative",
      "emailAddress": "kontakt@eksempel.no",
      "associatedBBL": true,
      "isFirstRefusalRights": false,
      "managementApproval": true,
      "firstRefusalRightOption": 2,
      "firstRefusalResponsible": 1,
      "managementApprovalOption": 1
    },
    "accountant": {
      "name": "Regnskapsfører AS",
      "address": {
        "street": "Regnskapsgata 10",
        "zipCode": "4321",
        "city": "Stavanger"
      },
      "emailAddress": "info@regnskapsforer.no",
      "telephone": "51999999"
    },
    "taxAssessment": {
      "year": "2024",
      "totalIncome": 500000,
      "totalExpense": 200000,
      "totalDebt": 100000,
      "totalFortune": 200000
    },
    "insurances": [
      {
        "policyNr": "INS12345",
        "dateFrom": "2023-01-01T00:00:00+01:00",
        "dateTo": "2025-05-01T00:00:00+02:00",
        "typeDescription": "Bygningsforsikring",
        "companyName": "Trygge rammer"
      }
    ],
    "loans": [
      {
        "loanNumber": "5906-1",
        "loanDescription": "Fellesgjeld DNB",
        "loanAmount": 25000000.0,
        "termsInYear": 12,
        "interestType": "Fast",
        "dueDate": "2029-05-31T00:00:00+02:00",
        "startDate": "2019-06-01T00:00:00+02:00",
        "inLoan": false,
        "maturity": 120,
        "currentRate": 3.25,
        "loanTypeDescription": "Boliglån",
        "mortgageeName": "DNB Bank ASA",
        "balance": 20000000.0,
        "balanceDate": "2025-10-31T00:00:00+01:00",
        "noInstalmentStartPeriod": "2025-01-01T00:00:00+01:00",
        "noInstalmentEndPeriod": "2025-12-31T00:00:00+01:00",
        "realEstate": {
          "fraction": 0.0125,
          "balance": 250000.0,
          "hasIndividualPaymentPlan": true,
          "monthlyInstalmentAmount": 0.0,
          "monthlyInterestAmount": 677.08,
          "monthlyCapitalCostsAmount": 677.08,
          "monthlyInstalmentAmountAfterNoInstalment": 2500.0,
          "monthlyInterestAmountAfterNoInstalment": 750.0,
          "monthlyCapitalCostsAmountAfterNoInstalment": 3250.0
        }
      },
      {
        "loanNumber": "9001-1",
        "loanDescription": "Garasjelån",
        "loanAmount": 35000000.0,
        "termsInYear": 12,
        "redemptionDate": "2052-02-28T00:00:00+01:00",
        "interestType": "Flytende",
        "dueDate": "2022-04-30T00:00:00+02:00",
        "startDate": "2022-03-01T00:00:00+01:00",
        "inLoan": true,
        "maturity": 360,
        "currentRate": 4.5,
        "futureRate": 4.75,
        "loanTypeDescription": "Boliglån",
        "mortgageeName": "Nordea Bank",
        "balance": 30200000.0,
        "balanceDate": "2024-10-31T00:00:00+01:00",
        "realEstate": {
          "fraction": 1.0,
          "balance": 30200000.0,
          "hasIndividualPaymentPlan": false,
          "monthlyCapitalCostsAmount": 20888.89
        }
      }
    ],
    "monthlyExpenses": [
      {
        "productCode": "STROM",
        "productDescription": "Strøm",
        "invoiceProfile": "Kvartalsvis",
        "productPrice": 1500.50,
        "futureProductPrices": [
          {
            "price": 1600.0,
            "activeFrom": "2025-02-01T00:00:00+01:00"
          }
        ]
      },
      {
        "productCode": "80",
        "productDescription": "Akonto renter",
        "invoiceProfile": "Månedlig",
        "productPrice": 947.02,
        "loanNumber": "2242"
      },
      {
        "productCode": "KABELTV",
        "productDescription": "Kabel-TV",
        "invoiceProfile": "Årlig",
        "futureProductPrices": [
          {
            "price": 210.0,
            "activeFrom": "2025-07-01T00:00:00+02:00"
          }
        ]
      }
    ],
    "mortgages": [
      {
        "mortgagorName": "Ola Nordmann",
        "mortgageDate": "2020-01-15T00:00:00+01:00",
        "dischargeDate": "2050-01-15T00:00:00+01:00",
        "dueDate": "2025-02-01T00:00:00+01:00",
        "reference": "Ref001",
        "mortgageType": "Pantelån",
        "priority": 1,
        "mortgageeNo": "12345678",
        "mortgageeName": "Nordea",
        "mortgageValue": 3000000.0,
        "mortgageNote": "Hovedbolig"
      },
      {
        "mortgagorName": "Ola Nordmann",
        "mortgageDate": "2020-01-15T00:00:00+01:00",
        "reference": "Ref002",
        "mortgageType": "Avtalepant",
        "priority": 2,
        "mortgageeNo": "12345678",
        "mortgageeName": "Nordea",
        "mortgageValue": 0.0,
        "mortgageValueDescription": "Ubegrenset",
        "mortgageNote": "Uten beløpsbegrensning"
      }
    ],
    "contractGuarantees": [
      {
        "guaranteeType": "Bankgaranti",
        "amount": 100000.0,
        "fromDate": "2023-01-01T00:00:00+01:00",
        "toDate": "2024-01-01T00:00:00+01:00",
        "bankAccountNumber": "1234 5678 9123",
        "company": "Sparebank1",
        "notes": "Sikkerhetsgaranti",
        "notificationDate": "2023-12-01T00:00:00+01:00"
      }
    ],
    "currentOwners": [
      {
        "firstName": "Kari",
        "lastName": "Nordmann",
        "fullname": "Kari Nordmann",
        "address": {
          "street": "Hovedgata 1",
          "zipCode": "1234",
          "city": "OSLO"
        },
        "isCoOwner": false,
        "ownershipFraction": {
          "numerator": 3,
          "denominator": 5
        }
      },
      {
        "firstName": "Birger",
        "lastName": "Nordmann",
        "fullname": "Birger Nordmann",
        "address": {
          "street": "Hovedgata 1",
          "zipCode": "1234",
          "city": "OSLO"
        },
        "isCoOwner": true,
        "ownershipFraction": {
          "numerator": 2,
          "denominator": 5
        }
      }
    ],
    "noteCategoryGroups": [
      {
        "noteCategoryGroupId": 2,
        "noteCategoryGroupDescription": "Parkering/Garasje",
        "notes": [
          {
            "noteId": 5678,
            "noteCategoryId": 21,
            "noteCategoryDescription": "DIV1",
            "text": "Parkering i gata"
          }
        ]
      }
    ],
    "valueDocuments": [
      {
        "valueDocumentType": "Aksjer",
        "faceValue": 1000.0,
        "numberSeries": "A-001 til A-010",
        "valueDocumentLocation": "Forretningsfører",
        "comment": "10 aksjer pålydende 100,-"
      }
    ],
    "broker": "Hans Megler",
    "brokerRef": "BR123",
    "chairman": {
      "name": "Ola Nordmann",
      "emailAddress": "styreleder@email.com",
      "phoneNumber": "81553337"
    },
    "accountManager": {
      "name": "Kari Rådgiver",
      "emailAddress": "radgiver@obos.no"
    }
  },
  "forretningsforer": {
    "navn": "UNTL",
    "adresse": {
      "gateadresse": "Postboks 112 Lier",
      "postnummer": "0501",
      "poststed": "Oslo"
    },
    "epost": "post@kunde.no"
  },
  "klient": {
    "klienttype": "Borettslag tilknyttet",
    "organisasjonsnavn": "Skauen Borettslag",
    "organisasjonsnummer": "948677202",
    "epost": "styret@brl.no",
    "styreleder": {
      "navn": "Ole Styreleder",
      "epost": "leder@brl.no",
      "telefonnr": "99889988"
    }
  },
  "levert": "2022-07-07T15:48:07.6328836Z",
  "referanse": "622/1",
  "eierform": "Seksjonseier"
}
```

### Felt i svaret

Svaret inkluderer alle standard callback-felter og i tillegg:

* **objektData** – selve eiendomsopplysningene. En fullt spesifisert struktur, beskrevet felt for felt i objektData-seksjonen nedenfor.
* **type** – meldingstypen ("megleropplysninger")
* **ordreId** – ordre-ID fra forespørselen
* **forretningsforer** – informasjon om forretningsføreren som håndterer eiendommen
  * navn – selskapsnavn
  * adresse – besøks- eller postadresse
  * epost – e-postadresse
* **klient** – informasjon om eierorganisasjonen
  * klienttype – type klient
  * organisasjonsnavn – navn på klienten
  * organisasjonsnummer – organisasjonsnummer
  * epost – kontaktadresse for klienten
  * styreleder – informasjon om styreleder
    * navn – navn på styreleder
    * epost – e-postadresse til styreleder
    * telefonnr – telefonnummer til styreleder
* **levert** – tidspunkt for når svaret ble produsert
* **referanse** – intern referanse hos forretningsføreren
* **eierform** – type eierskap (andelseier, seksjonseier, aksjonær)

Når systemet vårt mottar denne meldingen, gjøres megleropplysningene tilgjengelige i meglerløsningen.

## objektData

`objektData` speiler OnProperty sin `BrokerPropertyInformation`-record. Serialisering:

* Egenskapsnavn bruker camelCase
* Nullverdier utelates fra JSON (`WhenWritingNull`) – et valgfritt felt er enten med og har en verdi, eller helt utelatt. Sjekk om feltet finnes, ikke om det er `null`.
* Enumer serialiseres som strenger (f.eks. `HousingCooperative`)
* Datoformat er ISO 8601 / RFC 3339 (f.eks. `2025-01-01T12:00:00+01:00`), og kan inkludere tidssone-offset og brøkdeler av sekunder

### Toppnivå

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| orderId | string | Nei | Unik identifikator angitt i bestilling av megleropplysninger. |
| taskId | integer | Nei | Bestillingens saksid i ON Property. |
| registeredDate | date-time | Nei | Tidspunkt for levering av informasjonen. |
| realEstate | RealEstate | Nei | Detaljert informasjon om eiendommen. |
| accountingClient | AccountingClient | Nei | Informasjon om boligselskapet. |
| accountant | Accountant | Nei | Informasjon om forretningsfører. |
| taxAssessment | TaxAssessment | Ja | Tredjepartsopplysninger for gjeldende eiendom for siste tilgjengelige år. |
| insurances | array av Insurance | Ja | Liste over forsikringer. |
| loans | array av Loan | Ja | Liste over lån knyttet til boligselskapet. Se merknaden under Loan. |
| monthlyExpenses | array av MonthlyExpense | Nei | Liste over månedlige utgifter. |
| mortgages | array av Mortgage | Ja | Liste over pantobligasjoner på eiendommen. |
| contractGuarantees | array av ContractGuarantee | Ja | Liste over kontraktsgarantier. |
| currentOwners | array av Contact | Nei | Liste over nåværende eiere av eiendommen. |
| noteCategoryGroups | array av NoteCategoryGroup | Ja | Liste over notatgrupper med tilhørende notater knyttet til boligselskapet. |
| valueDocuments | array av ValueDocument | Ja | Liste med referanse til verdidokumenter tilknyttet eiendommer i boligaksjeselskaper. |
| broker | string | Ja | Navn på megleren som utførte bestillingen. |
| brokerRef | string | Ja | Referanseinformasjon for megleren. |
| chairman | Chairman | Ja | Informasjon om styreleder. |
| accountManager | AccountManager | Ja | Informasjon om rådgiver (kontoransvarlig) hos forretningsfører. |

### RealEstate

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| realEstateId | integer | Nei | Unik identifikator for eiendommen i ON Property. |
| realEstateCode | string | Ja | Kode som representerer eiendommen. |
| landNumber | integer | Ja | Gårdsnummer. |
| titleNumber | integer | Ja | Bruksnummer. |
| unitTypeNumber | string | Ja | Seksjonsnummer. |
| unitNumber | integer | Ja | Festenummer. |
| shareUnitNumber | string | Ja | Aksjeboenhetsnummer. Kun med hvis selskapstypen er Boligaksjeselskap. |
| address | Address | Nei | Adresse til eiendommen. |
| councilNumber | string | Ja | Kommunenummer. |
| councilName | string | Ja | Navn på kommunen. |
| initialPayment | number | Ja | Borettsinnskudd. |

### AccountingClient

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| name | string | Nei | Navn på boligselskapet. |
| organizationNumber | string | Nei | Organisasjonsnummer for boligselskapet. |
| accountingClientType | AccountingClientType | Nei | Type regnskapskunde. |
| emailAddress | string | Ja | E-postadresse til regnskapskunden. |
| associatedBBL | boolean | Nei | Angir om eiendommen er tilknyttet BBL. |
| isFirstRefusalRights | boolean | Nei | Angir om det finnes forkjøpsrett. |
| managementApproval | boolean | Nei | Angir om godkjenning fra styret er nødvendig. |
| firstRefusalRightOption | integer | Ja | Type forkjøpsrett. 1 = kan forhåndsutlyses, 2 = intern med forhåndsavklaring, 3 = intern uten forhåndsavklaring, 4 = ingen forhåndsavklaring, 5 = intern. |
| firstRefusalResponsible | integer | Ja | Hvem som er ansvarlig for avklaring av forkjøpsrett. 1 = forretningsfører, 2 = styret. |
| managementApprovalOption | integer | Ja | Hvem som er ansvarlig for avklaring av styregodkjenning. 1 = styret, 2 = forretningsfører, 3 = megler. |

### AccountingClientType (enum)

Serialiseres som navnet på verdien, f.eks. `HousingCooperative`.

| Verdi | Navn | Beskrivelse |
| --- | --- | --- |
| 0 | Other | Annet |
| 1 | JointStockCompany | Boligaksjeselskap |
| 2 | HousingCooperative | Borettslag |
| 3 | JointOwnership | Sameie |
| 4 | Foundation | Stiftelse |
| 5 | CoOperativeBuildingSociety | Boligbyggelag |
| 7 | Rentals | Utleie |
| 8 | Cooperative | Aksjeselskap |
| 9 | BusinessLimitedCompany | Næringsaksjeselskap |
| 10 | HeatingCentral | Varmesentral |
| 11 | GroundskeeperCentral | Vaktmestersentral |
| 12 | JointGarage | Garasjelag |
| 13 | JointOutside | Utomhus |
| 14 | JointRoad | Veilag |
| 15 | OperatingAssociation | Driftsforening |
| 16 | WelfareAssociation | Velforening |
| 17 | HomeownersAssociation | Huseierforening |
| 18 | SectionedJointOwnership | Eierseksjonsameie |
| 19 | LimitedPartnership | Komandittselskap |
| 20 | ResponsibleCompany | Ansvarligselskap |
| 21 | CooperationCooperative | Samvirkeforetak |
| 22 | DistrictCourtOwnership | Tingsrettsligsameie |

### Accountant

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| name | string | Nei | Navn på forvalter. |
| address | Address | Nei | Adresse til forvalter. |
| emailAddress | string | Ja | E-postadresse til forvalter. |
| telephone | string | Ja | Telefon til forvalter. |

### Chairman

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| name | string | Nei | Fullt navn på styreleder. |
| emailAddress | string | Ja | E-postadresse til styreleder hvis tilgjengelig. |
| phoneNumber | string | Ja | Telefonnummer til styreleder hvis tilgjengelig. Merk at styreleder bruker `phoneNumber`, mens forretningsfører bruker `telephone`. |

### AccountManager

Rådgiver (kontoransvarlig) hos forretningsfører.

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| name | string | Nei | Fullt navn på rådgiver. |
| emailAddress | string | Ja | E-postadresse til rådgiver hvis tilgjengelig. |

### Address

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| street | string | Nei | Gateadresse. |
| zipCode | string | Nei | Postnummer. |
| city | string | Nei | By/sted. |

### TaxAssessment

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| year | string | Nei | Ligningsår. |
| totalIncome | integer | Nei | Sum inntekter. |
| totalExpense | integer | Nei | Sum kostnader. |
| totalDebt | integer | Nei | Sum gjeld. |
| totalFortune | integer | Nei | Sum formue. |

### Insurance

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| policyNr | string | Nei | Forsikringsnummer. |
| dateFrom | date-time | Nei | Startdato for forsikringen. |
| dateTo | date-time | Ja | Sluttdato for forsikringen. |
| typeDescription | string | Nei | Beskrivelse av forsikringstype. |
| companyName | string | Nei | Navn på forsikringsselskapet. |

### Loan

Lån med saldo 0,00 utelates fra `loans`, selv om lånet er aktivt. Listen er sortert stigende etter `startDate` (eldst først).

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| loanNumber | string | Ja | Lånenummer. Kan mangle, så ikke bruk det alene som nøkkel. |
| loanDescription | string | Ja | Lånebeskrivelse. |
| loanAmount | number | Nei | Opprinnelig lånebeløp. |
| termsInYear | integer | Nei | Antall terminer per år. |
| redemptionDate | date-time | Ja | Innfrielsesdato. |
| interestType | string | Ja | Rentetype (Flytende/Fast). |
| dueDate | date-time | Ja | Neste forfallsdato fra nedbetalingsplanen. Mangler når det ikke finnes en fremtidig termin. |
| startDate | date-time | Ja | Startdato for lånet / utbetalingsdato. |
| inLoan | boolean | Nei | Om lånet er et InLoan (true) eller et felleslån (false). |
| maturity | integer | Nei | Løpetid i måneder. |
| currentRate | number | Ja | Gjeldende rentesats (%). |
| futureRate | number | Ja | Eventuell fremtidig rentesats (%). |
| loanTypeDescription | string | Ja | Lånetype-beskrivelse. |
| mortgageeName | string | Ja | Navn på panthaver/långiver. |
| balance | number | Nei | Total saldo på lånet. |
| balanceDate | date-time | Nei | Dato for saldo (siste bilagsdato fra hovedbok). |
| noInstalmentStartPeriod | date-time | Ja | Startdato for avdragsfri periode. |
| noInstalmentEndPeriod | date-time | Ja | Sluttdato for avdragsfri periode. |
| realEstate | LoanRealEstate | Ja | Eiendommens andel av lånet. Kun med hvis eiendommen deltar i lånet. |

### LoanRealEstate

**Avdrag/renter-splitt krever individuell nedbetalingsplan.** Når `hasIndividualPaymentPlan` er `true`, presenteres avdrag, renter og kapitalkostnad hver for seg. Når den er `false`, presenteres **kun** `monthlyCapitalCostsAmount` og eventuelt `monthlyCapitalCostsAmountAfterNoInstalment`; avdrags- og rentefeltene utelates.

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| fraction | number | Nei | Eiendommens brøkandel av lånet (samme for InLoan og felleslån). |
| balance | number | Nei | Eiendommens andel av saldo (total saldo × brøk). |
| hasIndividualPaymentPlan | boolean | Nei | True hvis beløpene kommer fra en individuell nedbetalingsplan, og avdrag/renter dermed er splittet. False betyr at kun kapitalkostnaden er satt. |
| monthlyInstalmentAmount | number | Ja | Eiendommens avdragsbeløp (månedlig). Kun ved individuell nedbetalingsplan. |
| monthlyInterestAmount | number | Ja | Eiendommens rentebeløp (månedlig). Kun ved individuell nedbetalingsplan. |
| monthlyCapitalCostsAmount | number | Ja | Eiendommens kapitalkostnader totalt (månedlig). |
| monthlyInstalmentAmountAfterNoInstalment | number | Ja | Eiendommens avdrag etter avdragsfri periode (månedlig). Kun ved individuell nedbetalingsplan. |
| monthlyInterestAmountAfterNoInstalment | number | Ja | Eiendommens renter etter avdragsfri periode (månedlig). Kun ved individuell nedbetalingsplan. |
| monthlyCapitalCostsAmountAfterNoInstalment | number | Ja | Eiendommens kapitalkostnader etter avdragsfri periode (månedlig). |

### MonthlyExpense

**VIKTIG – `productPrice` er ALLTID en MÅNEDSPRIS (beløp per måned), uavhengig av hvor ofte varen faktureres.** `invoiceProfile` angir hvor ofte varen faktureres. Faktisk fakturabeløp = `productPrice` × antall måneder mellom faktureringene:

| invoiceProfile | Faktureres | Fakturabeløp |
| --- | --- | --- |
| Månedlig | hver måned | `productPrice` × 1 |
| Annenhver måned | hver 2. måned | `productPrice` × 2 |
| Kvartalsvis | hvert kvartal | `productPrice` × 3 |
| Halvårlig | hvert halvår | `productPrice` × 6 |
| Årlig | én gang i året | `productPrice` × 12 |
| Manuell | manuelt | – |

Eksempel: `invoiceProfile = "Kvartalsvis"` og `productPrice = 500` betyr 500 kr/måned, som faktureres som 1500 kr hvert kvartal. Det samme gjelder `futureProductPrices[].price`.

`productPrice` kan mangle helt når varen kun har en fremtidig pris, så behandle en manglende verdi som 0 når du summerer.

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| productCode | string | Nei | Produktkode. Kun for sporing, og ikke garantert unik. |
| productDescription | string | Nei | Navn på produktet / kostnadstypen. |
| invoiceProfile | string | Nei | Hvor ofte varen faktureres, som norsk tekst: "Månedlig", "Annenhver måned", "Kvartalsvis", "Halvårlig", "Årlig" eller "Manuell". Styrer multiplikatoren for fakturabeløpet (se merknaden over). |
| productPrice | number | Ja | **Månedspris** – alltid beløp per måned, uavhengig av `invoiceProfile`. Gang med antall måneder mellom faktureringene for å få fakturabeløpet. Kan mangle hvis varen kun har en fremtidig pris. |
| loanNumber | string | Ja | Lånenummer når varen kan knyttes til et konkret lån (f.eks. à-konto avdrag eller renter). Hentes fra kontraktens lån-dimensjon eller individuell nedbetalingsplan. Utelates når varen ikke kan knyttes til et lån. |
| futureProductPrices | array av FutureProductPrice | Ja | Fremtidige priser for produktet. |

### FutureProductPrice

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| price | number | Nei | Fremtidig **månedspris** (samme betydning som `productPrice` – alltid per måned). |
| activeFrom | date-time | Nei | Startdato for når prisen gjelder. |
| activeTo | date-time | Ja | Sluttdato for når prisen gjelder. |

### Mortgage

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| mortgagorName | string | Nei | Navn på pantsetter. |
| mortgageDate | date-time | Ja | Dato for pantobligasjonen. |
| dischargeDate | date-time | Ja | Slettedato. |
| dueDate | date-time | Ja | Forfallsdato. |
| reference | string | Nei | Referanse. |
| mortgageType | string | Nei | Pantetype (f.eks. Pantelån). |
| priority | integer | Ja | Prioritet. |
| mortgageeNo | string | Nei | Panthaver-nummer. |
| mortgageeName | string | Nei | Navn på panthaver. |
| mortgageValue | number | Ja | Panteverdi. |
| mortgageValueDescription | string | Ja | «Ubegrenset» når `mortgageValue` er 0, altså pant uten beløpsbegrensning. |
| mortgageNote | string | Nei | Merknad til pant. |

### ContractGuarantee

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| guaranteeType | string | Ja | Type garanti. |
| amount | number | Ja | Garantibeløp. |
| fromDate | date-time | Ja | Startdato. |
| toDate | date-time | Ja | Sluttdato. |
| bankAccountNumber | string | Ja | Bankkontonummer. |
| company | string | Ja | Selskap. |
| notes | string | Ja | Merknader. |
| notificationDate | date-time | Ja | Varslingsdato. |

### Contact

Brukes i `currentOwners`.

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| isCoOwner | boolean | Nei | True = medeier, false = eier på kontrakt (fakturamottaker). |
| firstName | string | Ja | Fornavn til eier / navn på juridisk eier. |
| lastName | string | Ja | Etternavn til eier / blank ved juridisk eier. |
| fullname | string | Ja | Sammensatt fullt navn (fornavn eller organisasjonsnavn + etternavn). |
| address | Address | Ja | Adresse til eier. |
| ownershipFraction | OwnershipFraction | Ja | Eierbrøk som forenklet brøk. Spesifiserte andeler beholdes, resten fordeles likt på øvrige eiere. |

### OwnershipFraction

`ownershipFraction` er en forenklet brøk med heltall i teller og nevner (1/3), ikke prosent med desimaler (33,34 + 33,33 + 33,33).

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| numerator | integer | Nei | Teller i eierbrøk. |
| denominator | integer | Nei | Nevner i eierbrøk. |

### NoteCategoryGroup

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| noteCategoryGroupId | integer | Nei | Id til notatkategorigruppen. Predefinert liste, se tabellen nedenfor. |
| noteCategoryGroupDescription | string | Nei | Beskrivelse av gruppen. |
| notes | array av Note | Nei | Liste med notater tilknyttet denne kategorien. |

### Note

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| noteId | integer | Nei | Id til notatet. Kun for sporbarhet. |
| noteCategoryId | integer | Nei | Id til kategorien. |
| noteCategoryDescription | string | Nei | Kode / navn på notatkategori. |
| text | string | Nei | Selve notatteksten. |

### Notatkategorigrupper

| noteCategoryGroupId | noteCategoryGroupDescription |
| --- | --- |
| 1 | Generelt |
| 2 | Parkering |
| 3 | Dyrehold |
| 4 | Lån |
| 5 | Felleskostnader |
| 6 | TV |
| 7 | Særlig forhold |
| 8 | Rehabilitering |
| 9 | Energi |
| 10 | Internett |
| 11 | Vaktmester |
| 12 | Eiendomskatt |
| 13 | Sikringsordning |
| 14 | Andre objekter / fasiliteter |
| 15 | Forkjøpsrett |
| 16 | Styregodkjenning |

### ValueDocument

Verdidokumenter tilknyttet en eiendom i et boligaksjeselskap.

| Felt | Type | Valgfri | Beskrivelse |
| --- | --- | --- | --- |
| valueDocumentType | string | Nei | Type verdidokument, f.eks. aksjer, obligasjon eller gjeldsbrev. |
| faceValue | number | Nei | Pålydende verdi på dokumentet (beløp). |
| numberSeries | string | Ja | Nummer-/seriereferanse knyttet til dokumentet. |
| valueDocumentLocation | string | Nei | Hvor dokumentet befinner seg (forretningsfører, panthaver, aksjonær, m.m.). |
| comment | string | Ja | Tilleggsinformasjon om dokumentet. |

## Brukstips

* Produktet kan bestilles uavhengig av de andre meldingstypene
* Ingen spesielle prosesser eller godkjenninger er nødvendig
* `objektData` er en fullt spesifisert struktur, ikke et åpent nøkkel-verdi-kart
* Valgfrie felter utelates helt når de ikke har en verdi, så sjekk om feltet finnes i stedet for å sjekke mot `null`
* Beløp i `monthlyExpenses` og i `loans[].realEstate` er månedsbeløp. For månedlige utgifter er fakturabeløpet `productPrice` ganget med antall måneder mellom faktureringene
* Lån med saldo 0,00 utelates fra `loans` selv om de er aktive, og `loans` er sortert stigende etter `startDate` (eldst først)
* Avdrag og renter splittes kun når `hasIndividualPaymentPlan` er `true`; ellers presenteres kun kapitalkostnaden
* Eierbrøken i `ownershipFraction` er en forenklet brøk (1/3), ikke prosent med desimaler (33,34 + 33,33 + 33,33)
* For mer omfattende eiendomsinformasjon bør du bruke [Boliginformasjon](boliginformasjon.md)

</div>
