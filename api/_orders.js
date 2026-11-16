// Order forms (ใบสั่งยา) transcribed from the Siriraj Chemotherapy Protocol 2025, one file per PDF section.
import opd_aa_hlh from './_orders/opd_aa_hlh.js'
import all from './_orders/all.js'
import aml_mds from './_orders/aml_mds.js'
import apl from './_orders/apl.js'
import rr_leukemia from './_orders/rr_leukemia.js'
import lymphoma1 from './_orders/lymphoma1.js'
import lymphoma2 from './_orders/lymphoma2.js'
import nkt from './_orders/nkt.js'
import myeloma from './_orders/myeloma.js'
import hsct from './_orders/hsct.js'

export const ORDERS = [
  ...opd_aa_hlh, ...all, ...aml_mds, ...apl, ...rr_leukemia,
  ...lymphoma1, ...lymphoma2, ...nkt, ...myeloma, ...hsct,
]
