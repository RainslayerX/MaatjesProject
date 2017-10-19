using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using MaatjesProjectV2.Models.MemberViewModels;
using MaatjesProjectV2.Models.DTO;

namespace MaatjesProjectV2.Controllers
{
    [Produces("application/json")]
    [Route("api/login")]
    public class LoginController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        public LoginController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        // ********************************************************
        // Login
        // api/Login
        #region public IActionResult CurrentUser()
        [HttpGet]
        [AllowAnonymous]
        public IActionResult CurrentUser()
        {
            if (this.User.Identity.IsAuthenticated)
                return Ok(this.User.Identity.Name);
            else
                return NotFound();
        }
        #endregion
        // (POST) api/Login 
        #region public IActionResult Index([FromBody]DTOAuthentication Authentication)
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Index([FromBody]DTOAuthentication Authentication)
        {
            // Get values passed
            if (Authentication.UserName != null && Authentication.Password != null)
            {
                var result = _signInManager.PasswordSignInAsync(Authentication.UserName, Authentication.Password, false, false).Result;
                if (result.Succeeded)
                    return Ok(true);
            }
            return Ok(false);
        }
        #endregion
    }
}