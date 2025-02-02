import { BaseApi } from './BaseApi';
import type {
  GetEventMonitorsParameters,
  CreateEventMonitorParameters,
  UpdateEventMonitorParameters,
  DeleteEventMonitorParameters,
  GetEventLogsParameters,
  EventMonitor,
  EventLog,
} from './types';

export class SmartContractEventMonitorApi extends BaseApi {
  /**
   * Fetch a list of event monitors, optionally filtered by blockchain, contract address, and event signature.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/get-event-monitors
   * @param params parameters for the get event monitors request
   * @returns the event monitors related to the specified filters
   */
  async get(params?: GetEventMonitorsParameters): Promise<EventMonitor[]> {
    return this.getRequest<EventMonitor[]>(
      '/w3s/contracts/monitors',
      params,
      'eventMonitors',
    );
  }

  /**
   * Create a new event monitor based on the provided blockchain, contract address, and event signature.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/create-event-monitor
   * @param params parameters for the create event monitor request
   * @returns the new event monitor
   */
  async create(params: CreateEventMonitorParameters): Promise<EventMonitor[]> {
    return this.postRequest<EventMonitor[]>(
      '/w3s/contracts/monitors',
      this.addIdempotencyKeyToParams<CreateEventMonitorParameters>(params),
      'eventMonitors',
    );
  }

  /**
   * Update an existing event monitor given its ID.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/update-event-monitor
   * @param params parameters for the update event monitor request
   * @returns the updated event monitor
   */
  async update(params: UpdateEventMonitorParameters): Promise<EventMonitor[]> {
    const { id, ...rest } = params;

    return this.putRequest<EventMonitor[]>(
      `/w3s/contracts/monitors/${id}`,
      rest,
      'eventMonitors',
    );
  }

  /**
   * Delete an existing event monitor given its ID.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/delete-event-monitor
   * @param params parameters for the delete event monitor request
   * @returns an empty Promise
   */
  async delete(params: DeleteEventMonitorParameters): Promise<void> {
    const { id, ...rest } = params;
    return this.deleteRequest<void>(`/w3s/contracts/monitors/${id}`, rest);
  }

  /**
   * Fetch all event logs, optionally filtered by blockchain and contract address.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/list-event-logs
   * @param params parameters for the get event logs request
   * @returns the list of event logs
   */
  async getEventLogs(params?: GetEventLogsParameters): Promise<EventLog[]> {
    return this.getRequest<EventLog[]>('/w3s/contracts/events', params, 'eventLogs');
  }
}
