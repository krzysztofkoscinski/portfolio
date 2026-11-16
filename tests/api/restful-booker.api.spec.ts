import { randomUUID } from 'node:crypto';
import { test, expect } from './api.fixture';

test('TC-API-001: responds to the health check', async ({ request }) => {
  const response = await request.get('/ping');

  expect(response.status()).toBe(201);
});

test('TC-API-002: creates an authentication token', async ({ request }) => {
  const response = await request.post('/auth', {
    data: {
      username: 'admin',
      password: 'password123',
    },
  });

  expect(response.status()).toBe(200);

  const body: unknown = await response.json();
  if (typeof body !== 'object' || body === null || !('token' in body)) {
    throw new Error('POST /auth response did not contain a token field.');
  }

  expect(typeof body.token).toBe('string');
  expect(body.token).not.toBe('');
});

test('TC-API-003: rejects invalid authentication credentials', async ({ request }) => {
  const response = await request.post('/auth', {
    data: {
      username: 'admin',
      password: 'invalid-password',
    },
  });

  expect(response.status()).toBe(200);
  await expect(response.json()).resolves.toEqual({ reason: 'Bad credentials' });
});

test('TC-API-004: creates a booking with the requested details', async ({ booking }) => {
  expect(booking.creationStatus).toBe(200);
  expect(booking.creationBody).toEqual({
    bookingid: booking.id,
    booking: booking.payload,
  });
});

test('TC-API-005: retrieves a booking by its id', async ({ request, booking }) => {
  const response = await request.get(`/booking/${booking.id}`);

  expect(response.status()).toBe(200);
  await expect(response.json()).resolves.toEqual(booking.payload);
});

test('TC-API-006: filters bookings by guest first and last name', async ({ request, booking }) => {
  for (const [field, value] of [
    ['firstname', booking.payload.firstname],
    ['lastname', booking.payload.lastname],
  ]) {
    const response = await request.get('/booking', { params: { [field]: value } });

    expect(response.status()).toBe(200);
    await expect(response.json()).resolves.toEqual([{ bookingid: booking.id }]);
  }
});

test('TC-API-007: replaces a booking using PUT', async ({ request, authToken, booking }) => {
  const updatedBooking = {
    ...booking.payload,
    firstname: `${booking.payload.firstname}-put`,
    totalprice: booking.payload.totalprice + 1,
  };
  const response = await request.put(`/booking/${booking.id}`, {
    headers: { Cookie: `token=${authToken}` },
    data: updatedBooking,
  });

  expect(response.status()).toBe(200);
  await expect(response.json()).resolves.toEqual(updatedBooking);

  const readResponse = await request.get(`/booking/${booking.id}`);
  expect(readResponse.status()).toBe(200);
  await expect(readResponse.json()).resolves.toEqual(updatedBooking);
});

test('TC-API-008: partially updates a booking using PATCH', async ({
  request,
  authToken,
  booking,
}) => {
  const updatedBooking = {
    ...booking.payload,
    firstname: `${booking.payload.firstname}-patch`,
  };
  const response = await request.patch(`/booking/${booking.id}`, {
    headers: { Cookie: `token=${authToken}` },
    data: { firstname: updatedBooking.firstname },
  });

  expect(response.status()).toBe(200);
  await expect(response.json()).resolves.toEqual(updatedBooking);

  const readResponse = await request.get(`/booking/${booking.id}`);
  expect(readResponse.status()).toBe(200);
  await expect(readResponse.json()).resolves.toEqual(updatedBooking);
});

test('TC-API-009: rejects booking changes without valid authorization', async ({
  request,
  booking,
}) => {
  const unauthenticatedUpdate = await request.put(`/booking/${booking.id}`, {
    data: { ...booking.payload, firstname: `${booking.payload.firstname}-unauthorized` },
  });
  expect(unauthenticatedUpdate.status()).toBe(403);

  const invalidTokenDelete = await request.delete(`/booking/${booking.id}`, {
    headers: { Cookie: 'token=invalid-token' },
  });
  expect(invalidTokenDelete.status()).toBe(403);

  const readResponse = await request.get(`/booking/${booking.id}`);
  expect(readResponse.status()).toBe(200);
  await expect(readResponse.json()).resolves.toEqual(booking.payload);
});

test('TC-API-010: deletes a booking created by the test', async ({ request, booking }) => {
  const deleteResponse = await booking.remove();

  expect([200, 201]).toContain(deleteResponse.status());

  const readResponse = await request.get(`/booking/${booking.id}`);
  expect(readResponse.status()).toBe(404);
});

test('TC-API-011: exposes the demo server error for an incomplete payload', async ({
  request,
}) => {
  const response = await request.post('/booking', {
    data: { firstname: `invalid-${randomUUID()}` },
  });

  expect(response.status()).toBe(500);
  await expect(response.text()).resolves.toBe('Internal Server Error');
});

test('TC-API-012: returns XML when requested', async ({ request, booking }) => {
  const response = await request.get(`/booking/${booking.id}`, {
    headers: { Accept: 'application/xml' },
  });

  expect(response.status()).toBe(200);

  const body = await response.text();
  expect(body).toContain('<?xml');
  expect(body).toContain(`<firstname>${booking.payload.firstname}</firstname>`);
  expect(body).toContain(`<lastname>${booking.payload.lastname}</lastname>`);
});
