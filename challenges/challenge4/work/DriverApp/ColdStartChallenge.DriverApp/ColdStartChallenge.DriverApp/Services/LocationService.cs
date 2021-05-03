using ColdStartChallenge.DriverApp.Models;
using Microsoft.AspNetCore.SignalR.Client;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Xamarin.Essentials;

namespace ColdStartChallenge.DriverApp.Services
{
    public class LocationService
    {
        private CancellationTokenSource _cts;
        private readonly HttpClient _httpClient;
        private readonly HubConnection connection;

        public LocationService()
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri(Constants.BASE_URI);
            connection = new HubConnectionBuilder()
                .WithUrl(Constants.BASE_URI)
                .Build();


            connection.Closed += async (error) =>
            {
                await Task.Delay(new Random().Next(0, 5) * 1000);
                await connection.StartAsync();
            };
        }

        public async Task Send(Order order)
        {
            var serializedPayload = JsonConvert.SerializeObject(order);
            await connection.InvokeAsync("SendMessage",
                    order.User, serializedPayload);
            //var serializedPayload = JsonConvert.SerializeObject(order);
            //_httpClient.DefaultRequestHeaders.Add("x-ms-client-principal-name", order.User);
            //var response = await _httpClient.GetAsync("negotiate");
            //Debug.WriteLine(await response.Content.ReadAsStringAsync());
            //JToken jToken;
            //using (var streamReader = new StreamReader(await response.Content.ReadAsStreamAsync()))
            //using (var jsonReader = new JsonTextReader(streamReader))
            //{
            //    jToken = await JToken.LoadAsync(jsonReader);
            //}
        }

        public async Task<Xamarin.Essentials.Location> GetLocation()
        {
            try
            {
                // *** GET THE CURRENT LOCATION ***
                var status = await CheckAndRequestLocationPermission();
                if (status != PermissionStatus.Granted)
                {
                    // Notify user permission was denied
                    Console.WriteLine("Permission denied.");
                    return null;
                }
                var request = new GeolocationRequest(GeolocationAccuracy.Medium, TimeSpan.FromSeconds(10));
                _cts = new CancellationTokenSource();
                var location = await Geolocation.GetLocationAsync(request, _cts.Token);

                if (location != null)
                {
                    Console.WriteLine($"Latitude: {location.Latitude}, Longitude: {location.Longitude}, Altitude: {location.Altitude}");
                    return location;
                }
                
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error when retrieving location: {ex.Message}");
            }
            finally
            {
                if (_cts != null)
                {
                    _cts.Dispose();
                    _cts = null;
                }
            }
            return null;
        }

        public async Task<(Xamarin.Essentials.Location currentLocation, Placemark place)?> GetLocationDetail()
        {
            try
            {
                // *** GECODE THE CURRENT LOCATION **
                var location = await GetLocation();
                var placemarks = await Geocoding.GetPlacemarksAsync(location.Latitude, location.Longitude);
                return (location, placemarks.FirstOrDefault());
           }
            catch (Exception ex)
            {
                Console.WriteLine($"Error when geocoding current location: {ex.Message}");
            }
            finally
            {
                if (_cts != null)
                {
                    _cts.Dispose();
                    _cts = null;
                }
            }
            return null;
        }

        private async Task<PermissionStatus> CheckAndRequestLocationPermission()
        {
            var status = await Permissions.CheckStatusAsync<Permissions.LocationWhenInUse>();

            if (status == PermissionStatus.Granted)
                return status;

            if (status == PermissionStatus.Denied && DeviceInfo.Platform == DevicePlatform.iOS)
            {
                // Prompt the user to turn on in settings
                // On iOS once a permission has been denied it may not be requested again from the application
                return status;
            }

            if (Permissions.ShouldShowRationale<Permissions.LocationWhenInUse>())
            {
                // Prompt the user with additional information as to why the permission is needed
            }

            status = await Permissions.RequestAsync<Permissions.LocationWhenInUse>();

            return status;
        }
    }
}
