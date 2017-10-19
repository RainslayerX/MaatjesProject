using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using MaatjesProjectV2.Models.MemberViewModels;
using Microsoft.AspNetCore.Authorization;
using MaatjesProjectV2.Models.DTO;

namespace MaatjesProjectV2.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class RegisterController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        public RegisterController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        // ********************************************************
        // Register
        // api/Register
        #region public IActionResult Index([FromBody]RegisterDTO Register)
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Index([FromBody]DTOAuthentication Register)
        {
            // Create Account ****************************
            try
            {
                var user = new ApplicationUser { Email = Register.UserName };
                var result = _userManager.CreateAsync(user, Register.Password).Result;
                if (result.Succeeded)
                {
                    // Sign the User in
                    var SignInResult = _signInManager.PasswordSignInAsync(Register.UserName, Register.Password, false, lockoutOnFailure: false).Result;
                    if (!SignInResult.Succeeded)
                        return NotFound();
                }
                else
                    return BadRequest();
                
                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        #endregion
    }
}