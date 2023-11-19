import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';
import { APIResponse, RUAPI_PARAMS } from '../types';

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private readonly logger: Logger
  ) {}

  fetchUsers({ page, limit }: RUAPI_PARAMS): Observable<APIResponse> {
    const url = 'https://randomuser.me/api/';
    const params = {
      results: limit,
      nat: 'us',
      seed: 'million_users',
      page,
    };

    return this.httpService.get(url, { params }).pipe(
      map((response) => response.data),
      catchError((error) => {
        this.logger.error(
          `Failed to fetch users: ${error.message}`,
          error.stack
        );
        return throwError(
          () => new Error(`Failed to fetch users: ${error.message}`)
        );
      })
    );
  }
}
