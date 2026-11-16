import { randomUUID } from 'node:crypto';
import { test as base, expect, type APIResponse } from '@playwright/test';

type BookingPayload = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds: string;
};

type BookingFixture = {
  id: number;
  payload: BookingPayload;
  creationStatus: number;
  creationBody: unknown;
  remove: () => Promise<APIResponse>;
};

type ApiFixtures = {
  authToken: string;
  booking: BookingFixture;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function createBookingPayload(): BookingPayload {
  const marker = randomUUID();

  return {
    firstname: `api-${marker}`,
    lastname: `test-${marker}`,
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2030-01-01',
      checkout: '2030-01-02',
    },
    additionalneeds: 'Playwright API test',
  };
}

export const test = base.extend<ApiFixtures>({
  authToken: async ({ request }, use) => {
    const response = await request.post('/auth', {
      data: {
        username: 'admin',
        password: 'password123',
      },
    });

    expect(response.status()).toBe(200);

    const body: unknown = await response.json();
    if (!isRecord(body) || typeof body.token !== 'string' || body.token.length === 0) {
      throw new Error('POST /auth did not return a non-empty token.');
    }

    await use(body.token);
  },
  booking: async ({ request, authToken }, use) => {
    const payload = createBookingPayload();
    const createResponse = await request.post('/booking', { data: payload });
    const creationBody: unknown = await createResponse.json();

    if (!isRecord(creationBody) || typeof creationBody.bookingid !== 'number') {
      throw new Error(
        `POST /booking did not return a numeric bookingid (HTTP ${createResponse.status()}).`,
      );
    }

    const id = creationBody.bookingid;
    let removed = false;
    const remove = async () => {
      const response = await request.delete(`/booking/${id}`, {
        headers: { Cookie: `token=${authToken}` },
      });

      if (response.ok()) {
        removed = true;
      }

      return response;
    };

    await use({
      id,
      payload,
      creationStatus: createResponse.status(),
      creationBody,
      remove,
    });

    if (!removed) {
      const existingBooking = await request.get(`/booking/${id}`);

      if (existingBooking.status() === 200) {
        const cleanupResponse = await remove();
        expect([200, 201]).toContain(cleanupResponse.status());
      } else if (existingBooking.status() !== 404) {
        throw new Error(
          `Could not verify cleanup for booking ${id} (HTTP ${existingBooking.status()}).`,
        );
      }
    }
  },
});

export { expect };
