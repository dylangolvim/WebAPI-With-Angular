using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmpresaWithAngular.Models;

namespace EmpresaWithAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly CompanyContext _context;

        public CompaniesController(CompanyContext context)
        {
            _context = context;
        }

        // GET: api/Companies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompaniesAsync()
        {
            return await _context.Companies.ToListAsync();
        }

        // GET: api/Companies/5
        [HttpGet("{companyId}")]
        public async Task<ActionResult<Company>> GetCompanyByIdAsync(int companyId)
        {
            var company = await _context.Companies.FindAsync(companyId);

            if (company == null)
            {
                return NotFound();
            }

            return company;
        }

        // POST: api/Companies
        [HttpPost]
        public async Task<ActionResult<Company>> PostCompany(Company company)
        {
            await _context.Companies.AddAsync(company);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // PUT: api/Companies/5
        [HttpPut]
        public async Task<IActionResult> PutCompany( Company company)
        {

            _context.Companies.Update(company);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Companies/5
        [HttpDelete("{companyId}")]
        public async Task<ActionResult<Company>> DeleteCompany(int companyId)
        {
            Company company = await _context.Companies.FindAsync(companyId);

            if (company == null)
                return NotFound();

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
