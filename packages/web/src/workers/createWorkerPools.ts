import { Pool, spawn, Worker } from 'threads'

import type { ParseThread } from './worker.parse'
import type { AnalyzeThread } from './worker.analyze'
import type { WorkerPools } from './types'

const NUM_PARSER_THREADS = 1 as const
const NUM_ANALYZER_THREADS = 4 as const

export function createWorkerPools(): WorkerPools {
  if (typeof window !== 'undefined') {
    const poolParse = Pool<ParseThread>(() => spawn(new Worker('./worker.parse.ts')), {
      size: NUM_PARSER_THREADS, // number of workers to spawn, defaults to the number of CPU cores
      concurrency: 1, // number of tasks to run simultaneously per worker, defaults to one
      name: 'parse',
      maxQueuedJobs: undefined,
    })

    const poolAnalyze = Pool<AnalyzeThread>(() => spawn(new Worker('./worker.analyze.ts')), {
      size: NUM_ANALYZER_THREADS, // number of workers to spawn, defaults to the number of CPU cores
      concurrency: 1, // number of tasks to run simultaneously per worker, defaults to one
      name: 'analyze',
      maxQueuedJobs: undefined,
    })

    return { poolParse, poolAnalyze }
  }

  throw new Error(' createWorkerPools: unable to create worker pools')
}
