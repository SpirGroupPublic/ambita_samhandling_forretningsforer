// Dato med tidspunkt i ISO-format.
// Tidspunktet må oppgis i UTC, slik '2021-09-01T12:00:00Z'
// eller i en gitt offset-zone ,'2021-09-01T12:00:00+02:00'
export type ISODateTime = string

// Dato på ISO format ('2021-09-01')
export type ISODate = string

export enum BestillingsFormat {
  MANUELT = 'Manuelt',
  ELEKTRONISK = 'Elektronisk'
}

export type BestillingsmottakerType = "forretningsforer" | "lag" | "eksternforretningsforer";

export enum Feilkode {
  forhandsutlysingAlleredeOpprettet = 1,
  eierskifteAlleredeOpprettet = 2,
  forhandsutlysningStottesIkke = 4,
  tilknyttetAnnetBoligbyggelag = 6, // behandles av annet boligbyggelag
  tilknyttetAnnenForretningsforer = 8, // behandles av annen forretningsfører
  eiendomIkkeFunnet = 11, // finner ikke eiendom basert på vedlagt id
  salgsmeldingOrdreIkkeFunnet = 12, // Kan ikke gjøre endring på en salgsmelding som ikke er opprettet
  forhandIkkeUtloptSjekkStatus = 31, // ny ordre på samme objekt fra samme megler
  forhandIkkeUtloptKontaktForrForer = 32, // ny ordre på samme objekt fra annen megler
  manuellBehandling = 33, // kreves manuell behandling av forretningsfører
  sakstypeForKlientIkkeFunnet = 34, // sakstype for klient ikke funnet
  endringOverdragelseIKunngjoringsperioden = 35, // Endring av overdragelse i kunngjøringsperioden er ikke tillatt
  salgsmeldingKanIkkeLeveresDigital = 39, // Aktiv manuell forhåndsutlysing finnes. Kontakt forretningsfører!
  eierskiftesakIkkeFunnet = 41, // Eierskiftesaken ble ikke funnet.
  eierskifteIkkeFullfort = 42, // Eierskifte er ikke fullført.
  forkjopsrettIkkeAvklart = 43, // Forkjopsrett er ikke avklart
  midlertidigFeil = 99 // Forretningsfører opplevde en midlertidig feil og ber om at det prøves igjen
}

export interface Styreleder {
  navn: string
  epost?: string
  telefonnr?: string
}

export interface Klient {
  klienttype: string
  organisasjonsnavn: string
  organisasjonsnummer: string
  epost?: string
  nettside?: string
  styreleder?: Styreleder
}

export interface Adresse {
  gateadresse: string
  postnummer: string
  poststed: string
}

export interface Eierbrok {
  teller: number
  nevner: number
}

export interface Kontakt {
  id: string
  fornavn?: string
  etternavn?: string
  organisasjonsnavn?: string
  kontaktperson?: string
  adresse: Adresse
  epost?: string
  telefon?: string
  eierbrok?: Eierbrok
}

export interface Callback {
  type: string
  ordreId: string
  forretningsforer: {
    navn: string
    adresse: Adresse
    epost: string
    epostRestanse?: string
  }
  klient?: Klient
  levert?: ISODateTime
  referanse?: string
  eierform?: 'Aksjonær' | 'Andelseier' | 'Sameier' | 'Seksjonseier'
}

export interface Feil extends Callback {
  type: 'feil'
  feilmelding: string
  feilkode?: Feilkode
  tidspunkt: ISODateTime
  kansellert?: boolean
}

// Callback types
export interface Boliginformasjon extends Callback {
  type: 'boliginformasjon'
  forkjopsrett: {
    harForkjopsrett: boolean
    kanForhandsutlyses?: boolean
    intern?: boolean
    bestillingsformat?: BestillingsFormat
    mottakerType?: BestillingsmottakerType
    gebyr?: number
  }
  styregodkjenning: {
    pakrevd: boolean
    bestillingsformat?: BestillingsFormat
    mottakerType?: BestillingsmottakerType
  }
  salgsmelding: {
    bestillingsformat: BestillingsFormat
    gebyr?: number
  }
  restanse: {
    bestillingsformat: BestillingsFormat
  }
  andreHensyn?: string
}

export interface ForhandsutlysingTidlig extends Callback {
  type: 'forhandsutlysingtidlig'
  ordreMottatt: ISODateTime
  utlysingssted: string
  utlysingsdato: ISODate
  meldefrist: ISODateTime
}

export interface ForhandsutlysingUtsatt extends Callback {
  type: 'forhandsutlysingutsatt'
  ordreMottatt: ISODateTime
  utlysingssted: string
  utlysingsdato: ISODate
  meldefrist: ISODateTime
}

export interface ForhandsutlysingSen extends Callback {
  type: 'forhandsutlysingsen'
  ordreMottatt: ISODateTime
  utlysingssted: string
  utlysingsdato: ISODate
  meldefrist: ISODateTime
  antallInteressenter: number
  varighetForkjopsrett: ISODate
}

export interface ForhandsutlysingUtlopt extends Callback {
  type: 'forhandsutlysingutlopt'
}

export interface Styregodkjenning {
  handteresAvForretningsforer: boolean
  initiertDato?: ISODate
  meldefrist?: ISODateTime
}

export interface StyregodkjenningFullfort extends Styregodkjenning {
  statusStyregodkjenning?: 'godkjent_av_styret' | 'godkjent_av_bbl' | 'avvist_av_styret' | 'avvist_av_bbl' | 'frist_utlopt'
  andreHensyn?: string
}

export interface SalgsmeldingForkjopsrett {
  typeAvklaring: 'fastpris' | 'forhandsutlysing'
  statusForhandsutlysing: 'ikke_forhandsutlysing' | 'med_interessenter' | 'uten_interessenter' | 'forkjop_ikke_benyttet' | 'ikke_avklart'
  utlysingsdato?: ISODate
  utlysingssted?: string
  meldefrist?: ISODateTime
}

export interface SalgsmeldingForkjopsrettFullfort extends SalgsmeldingForkjopsrett {
  statusForkjopsrett: 'ikke_benyttet' | 'benyttet'
  andreHensyn?: string
}

/**
 * SalgsmeldingMottatt
 * optional - clarifies process, can be omitted if no process is needed
 */
export interface SalgsmeldingMottatt extends Callback {
  type: 'salgsmeldingmottatt'
  ordreMottatt: ISODateTime
  harForkjopsrett: boolean
  forkjopsrett?: SalgsmeldingForkjopsrett
  styregodkjenningPakrevd?: boolean
  styregodkjenning?: Styregodkjenning
  tilknyttetLag: boolean
}

/**
 * SalgsmeldingOppdatering
 * optional - can be sent before board approval process completed
 */
export interface SalgsmeldingOppdatering extends Callback {
  type: 'salgsmeldingoppdatering'
  ordreMottatt: ISODateTime
  harForkjopsrett: boolean
  forkjopsrett?: SalgsmeldingForkjopsrettFullfort
  styregodkjenningPakrevd?: boolean
  styregodkjenning?: Styregodkjenning
  kjopere: Kontakt[]
  tilknyttetLag: boolean
}

/**
 * SalgsmeldingFullfort
 * required - expected at the end of the process - marks sale process completed
 */
export interface SalgsmeldingFullfort extends Callback {
  type: 'salgsmeldingfullfort'
  ordreMottatt: ISODateTime
  harForkjopsrett: boolean
  forkjopsrett?: SalgsmeldingForkjopsrettFullfort
  styregodkjenningPakrevd?: boolean
  styregodkjenning?: StyregodkjenningFullfort
  kjopere: Kontakt[]
  tilknyttetLag: boolean
}

/**
 * EndringOverdragelse
 * required - Respond if the requested transfer date was accepted
 */
export interface EndringOverdragelseBehandlet extends Callback {
  type: 'endringoverdragelse'
  datoEndret: boolean
  avvisningsarsak?: string
}

/**
 * EndringKjopereMottatt
 * optional - to be used if updates trigger new board approval
 */
export interface EndringKjopereMottatt extends Callback {
  type: 'endringkjoperemottatt'
  ordreMottatt: ISODateTime
  styregodkjenningPakrevd?: boolean
  styregodkjenning?: Styregodkjenning
}

/**
 * EndringKjopereFullfort
 * required - confirms process completed
 */
export interface EndringKjopereFullfort extends Callback {
  type: 'endringkjoperefullfort'
  ordreMottatt: ISODateTime
  styregodkjenningPakrevd?: boolean
  styregodkjenning?: StyregodkjenningFullfort
}

/**
 * SluttbrevAkseptert
 * required - confirms process completed
 */
export interface SluttbrevAkseptert extends Callback {
  type: 'sluttbrevakseptert'
}

/**
 * SumGjeld
 * required - returns the total debt
 */
export interface SumGjeldSvar extends Callback {
  type: 'sumgjeld'
  sumGjeld: number
}

/**
 * SumFelleskostnader
 * required - returns the total common costs
 */
export interface SumFelleskostnaderSvar extends Callback {
  type: 'sumfelleskostnader'
  sumFelleskostnader: number
}

export type Kravtype = 'hjemmelskrav' | 'annet'

export interface Restansepost {
  kravtype: Kravtype
  fakturanummer: string
  kid?: string
  fakturadato: ISODate
  forfallsdato: ISODate
  periodeFra: ISODate
  periodeTil: ISODate
  kategori?: string
  beskrivelse?: string
  nettobelop: number
  mvaBelop: number
  utestaende: number
  forfalt: boolean
}

export interface Betalingsinformasjon {
  totalsum: number
  sumHjemmelskrav: number
  sumAndreKrav: number
  kontonummer: string
  kid?: string // NY: KID for samlet innbetaling
  forfallsdato: ISODate // NY: forfall for samlet innbetaling
}

export interface Inkassosak {
  saksnummer: string
  belop?: number
  inkassoselskap: {
    navn: string
    telefon?: string
    epost?: string
  }
}

export interface Gebyr {
  gebyrtype:
    | 'forhandsutlysingsgebyr'
    | 'eierskiftegebyr'
    | 'administrasjonsgebyr'
    | 'noteringsgebyr'
    | 'transportgebyr'
  beskrivelse?: string
  fakturanummer: string
  kid?: string
  forfallsdato: ISODate // NY
  nettobelop: number
  mvaBelop: number
  utestaende: number
}

/**
 * RestanseResultat
 * required - returns outstanding arrears, payment information and debt collection cases
 */
export interface RestanseResultat extends Callback {
  type: 'restanseresultat'
  beregnetDato: ISODate
  merknad?: string
  restanserBoligselskap: {
    felleskostnader: Restansepost[]
    andreKostnader: Restansepost[]
    betalingsinformasjon: Betalingsinformasjon
  }
  inkasso?: {
    saker: Inkassosak[]
  }
  restanserForretningsforer?: {
    gebyrer: Gebyr[]
    betalingsinformasjon: Betalingsinformasjon
  }
}

/**
 * Types for Megleropplysninger callback data from accountants
 *
 * Speiler OnProperty sitt BrokerPropertyInformation-schema
 * (broker-property-information-response.schema.json). Et felt er valgfritt her
 * hvis og bare hvis schemaet ikke har det i 'required' — payloaden serialiseres
 * med WhenWritingNull, så nullverdier utelates helt fra JSON.
 */
export interface MegleropplysningerRealEstateAddress {
  street: string
  zipCode: string
  city: string
}

export interface MegleropplysningerRealEstate {
  realEstateId: number
  realEstateCode?: string
  // Gårdsnummer
  landNumber?: number
  // Bruksnummer
  titleNumber?: number
  // Seksjonsnummer
  unitTypeNumber?: string
  // Festenummer
  unitNumber?: number
  // Aksjeboenhetsnummer, kun ved boligaksjeselskap
  shareUnitNumber?: string
  address: MegleropplysningerRealEstateAddress
  councilNumber?: string
  councilName?: string
  // Borettsinnskudd
  initialPayment?: number
}

export interface MegleropplysningerAccountingClient {
  name: string
  organizationNumber: string
  // Én av: Other, JointStockCompany, HousingCooperative, JointOwnership,
  // Foundation, CoOperativeBuildingSociety, Rentals, Cooperative,
  // BusinessLimitedCompany, HeatingCentral, GroundskeeperCentral, JointGarage,
  // JointOutside, JointRoad, OperatingAssociation, WelfareAssociation,
  // HomeownersAssociation, SectionedJointOwnership, LimitedPartnership,
  // ResponsibleCompany, CooperationCooperative, DistrictCourtOwnership.
  // Holdt som string — ekstern enum vi ikke kontrollerer.
  accountingClientType: string
  emailAddress?: string
  associatedBBL: boolean
  isFirstRefusalRights: boolean
  managementApproval: boolean
  // 1 = Kan forhåndsutlyses, 2 = Intern med forhåndsavklaring,
  // 3 = Intern uten forhåndsavklaring, 4 = Ingen forhåndsavklaring, 5 = Intern
  firstRefusalRightOption?: number
  // 1 = Forretningsfører, 2 = Styret
  firstRefusalResponsible?: number
  // 1 = Styret, 2 = Forretningsfører, 3 = Megler
  managementApprovalOption?: number
}

export interface MegleropplysningerAccountant {
  name: string
  address: MegleropplysningerRealEstateAddress
  emailAddress?: string
  telephone?: string
}

export interface MegleropplysningerChairman {
  name: string
  emailAddress?: string
  // NB: styreleder bruker phoneNumber, forretningsfører bruker telephone
  phoneNumber?: string
}

// Rådgiver / kontoransvarlig hos forretningsfører
export interface MegleropplysningerAccountManager {
  name: string
  emailAddress?: string
}

export interface MegleropplysningerInsurance {
  policyNr: string
  dateFrom: ISODateTime
  dateTo?: ISODateTime
  typeDescription: string
  companyName: string
}

export interface MegleropplysningerFutureProductPrice {
  // Månedspris — samme betydning som productPrice
  price: number
  activeFrom: ISODateTime
  activeTo?: ISODateTime
}

export interface MegleropplysningerMonthlyExpense {
  // Produktkode, kun for sporing. Ikke garantert unik.
  productCode: string
  productDescription: string
  // Faktureringshyppighet som norsk tekst: 'Månedlig', 'Annenhver måned',
  // 'Kvartalsvis', 'Halvårlig', 'Årlig' eller 'Manuell'. Holdt som string —
  // en ny verdi fra OnProperty skal ikke brekke type-check.
  invoiceProfile: string
  // ALLTID månedsbeløp, uavhengig av invoiceProfile. Fakturabeløp =
  // productPrice × antall måneder mellom faktureringer (Kvartalsvis ×3,
  // Halvårlig ×6, Årlig ×12). Kan mangle når varen kun har fremtidig pris.
  productPrice?: number
  // Lånenummer når varen kan knyttes til et konkret lån (f.eks. à-konto
  // avdrag/renter). Utelates når varen ikke kan knyttes til et lån.
  loanNumber?: string
  futureProductPrices?: MegleropplysningerFutureProductPrice[]
}

export interface MegleropplysningerOwnershipFraction {
  // Forenklet brøk — 1/3, ikke 33,34 + 33,33 + 33,33
  numerator: number
  denominator: number
}

export interface MegleropplysningerOwner {
  // true = medeier, false = eier på kontrakt (fakturamottaker)
  isCoOwner: boolean
  firstName?: string
  lastName?: string
  fullname?: string
  ownershipFraction?: MegleropplysningerOwnershipFraction
  address?: MegleropplysningerRealEstateAddress
}

export interface MegleropplysningerTaxAssessment {
  year: string
  totalIncome: number
  totalExpense: number
  totalDebt: number
  totalFortune: number
}

/**
 * Eiendommens andel av et lån.
 *
 * Avdrag og renter splittes kun når hasIndividualPaymentPlan er true. Uten
 * individuell nedbetalingsplan settes kun monthlyCapitalCostsAmount og
 * eventuelt monthlyCapitalCostsAmountAfterNoInstalment.
 */
export interface MegleropplysningerLoanRealEstate {
  // Eiendommens brøkandel av lånet
  fraction: number
  // Eiendommens andel av saldo (total saldo × brøk)
  balance: number
  hasIndividualPaymentPlan: boolean
  monthlyInstalmentAmount?: number
  monthlyInterestAmount?: number
  monthlyCapitalCostsAmount?: number
  // Beløp etter avdragsfri periode — se loan.noInstalmentEndPeriod
  monthlyInstalmentAmountAfterNoInstalment?: number
  monthlyInterestAmountAfterNoInstalment?: number
  monthlyCapitalCostsAmountAfterNoInstalment?: number
}

/**
 * Lån knyttet til boligselskapet.
 *
 * Lån med saldo 0,00 utelates av OnProperty, selv om de er aktive.
 * Listen er sortert stigende etter startDate (eldst først).
 */
export interface MegleropplysningerLoan {
  // Kan mangle — ikke bruk alene som nøkkel ved deduplisering
  loanNumber?: string
  loanDescription?: string
  // Opprinnelig lånebeløp
  loanAmount: number
  // Antall terminer per år
  termsInYear: number
  redemptionDate?: ISODateTime
  // Flytende/Fast
  interestType?: string
  // Neste forfallsdato fra nedbetalingsplanen. Mangler når det ikke finnes
  // en fremtidig termin.
  dueDate?: ISODateTime
  // Startdato / utbetalingsdato for lånet
  startDate?: ISODateTime
  // true = InLoan, false = felleslån
  inLoan: boolean
  // Løpetid i måneder
  maturity: number
  currentRate?: number
  futureRate?: number
  loanTypeDescription?: string
  mortgageeName?: string
  // Total saldo på lånet
  balance: number
  balanceDate: ISODateTime
  noInstalmentStartPeriod?: ISODateTime
  noInstalmentEndPeriod?: ISODateTime
  // Eiendommens andel — kun hvis eiendommen deltar i lånet
  realEstate?: MegleropplysningerLoanRealEstate
}

export interface MegleropplysningerMortgage {
  mortgagorName: string
  mortgageDate?: ISODateTime
  // Slettedato
  dischargeDate?: ISODateTime
  dueDate?: ISODateTime
  reference: string
  // Pantetype, f.eks. Pantelån
  mortgageType: string
  priority?: number
  mortgageeNo: string
  mortgageeName: string
  mortgageValue?: number
  // 'Ubegrenset' når mortgageValue er 0 (pant uten beløpsbegrensning)
  mortgageValueDescription?: string
  // Påkrevd i schemaet, men WhenWritingNull kan i praksis utelate den
  mortgageNote: string
}

export interface MegleropplysningerContractGuarantee {
  guaranteeType?: string
  amount?: number
  fromDate?: ISODateTime
  toDate?: ISODateTime
  bankAccountNumber?: string
  company?: string
  notes?: string
  notificationDate?: ISODateTime
}

export interface MegleropplysningerNote {
  noteId: number
  noteCategoryId: number
  noteCategoryDescription: string
  text: string
}

export interface MegleropplysningerNoteCategoryGroup {
  noteCategoryGroupId: number
  noteCategoryGroupDescription: string
  notes: MegleropplysningerNote[]
}

// Verdidokument tilknyttet eiendom i boligaksjeselskap
export interface MegleropplysningerValueDocument {
  // Aksjer, obligasjon, gjeldsbrev osv.
  valueDocumentType: string
  // Pålydende verdi
  faceValue: number
  // Nummer-/seriereferanse
  numberSeries?: string
  // Forretningsfører, panthaver, aksjonær, m.m.
  valueDocumentLocation: string
  comment?: string
}

export interface MegleropplysningerObjektdata {
  orderId: string
  // Bestillingens saksid i OnProperty
  taskId: number
  registeredDate: ISODateTime
  realEstate: MegleropplysningerRealEstate
  accountingClient: MegleropplysningerAccountingClient
  accountant: MegleropplysningerAccountant
  taxAssessment?: MegleropplysningerTaxAssessment
  insurances?: MegleropplysningerInsurance[]
  loans?: MegleropplysningerLoan[]
  monthlyExpenses: MegleropplysningerMonthlyExpense[]
  mortgages?: MegleropplysningerMortgage[]
  contractGuarantees?: MegleropplysningerContractGuarantee[]
  currentOwners: MegleropplysningerOwner[]
  noteCategoryGroups?: MegleropplysningerNoteCategoryGroup[]
  valueDocuments?: MegleropplysningerValueDocument[]
  broker?: string
  brokerRef?: string
  chairman?: MegleropplysningerChairman
  accountManager?: MegleropplysningerAccountManager
}

/**
 * Megleropplysninger
 * returns object data for delivery to the broker
 */
export interface MegleropplysningerSvar extends Callback {
  type: 'megleropplysninger'
  objektData: MegleropplysningerObjektdata
}

export type CallbackEvent =
  | Boliginformasjon
  | Feil
  | ForhandsutlysingTidlig
  | ForhandsutlysingUtsatt
  | ForhandsutlysingSen
  | ForhandsutlysingUtlopt
  | EndringOverdragelseBehandlet
  | SalgsmeldingMottatt
  | SalgsmeldingOppdatering
  | SalgsmeldingFullfort
  | EndringKjopereMottatt
  | EndringKjopereFullfort
  | SluttbrevAkseptert
  | SumGjeldSvar
  | SumFelleskostnaderSvar
  | RestanseResultat
  | MegleropplysningerSvar
