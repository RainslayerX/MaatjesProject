using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MaatjesProject.Data;
using MaatjesProject.Models.MemberViewModels;
using Microsoft.AspNetCore.Identity;
using AspNet.Security.OAuth.Validation;
using Microsoft.AspNetCore.Authorization;
using AspNet.Security.OpenIdConnect.Primitives;
using Newtonsoft.Json.Linq;
using OpenIddict.Core;
using Newtonsoft.Json;

namespace MaatjesProject.Controllers
{
    [Route("api")]
    public class UserInfoController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ProjectContext _context;

        public UserInfoController(UserManager<ApplicationUser> userManager, ProjectContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        //
        // GET: /api/userinfo
        [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
        [HttpGet("userinfo"), Produces("application/json")]
        public async Task<IActionResult> Userinfo()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return BadRequest(new OpenIdConnectResponse
                {
                    Error = OpenIdConnectConstants.Errors.InvalidGrant,
                    ErrorDescription = "The user profile is no longer available."
                });
            }

            var claims = new JObject();

            // Note: the "sub" claim is a mandatory claim and must be included in the JSON response.
            claims[OpenIdConnectConstants.Claims.Subject] = user.Id;
            claims[OpenIdConnectConstants.Claims.Email] = user.Email;
            claims[OpenIddictConstants.Claims.Roles] = JArray.FromObject(await _userManager.GetRolesAsync(user));
            claims["person"] = JsonConvert.SerializeObject(await _context.People.Where(x => x.Email == user.Email).SingleAsync());

            return Json(claims);
        }
    }
}