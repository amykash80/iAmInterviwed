using Moq;
using IAI.WebAPI.Controllers;
using IAI.Models.Models;
using IAI.BusinessService.Interface;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using IAI.Models.Models.Requests;
using IAI.Models.Models.Responses;

namespace IAI.UnitTest.ControllerTests
{
    public class PrimarySkillTestController
    {
        private readonly Mock<IPrimarySkillService> primarySkillService;
        public PrimarySkillTestController()
        {
            primarySkillService = new Mock<IPrimarySkillService>();
        }

        [Fact]
        public async void GetPrimarySkills_PrimarySkills()
        {
            //arrange
            FilterPagingParameters parms = new FilterPagingParameters();
            parms.Page = 1;
            parms.PageSize = 1;
            var primarySkills = GetPrimarySkillsData();
            primarySkillService.Setup(x => x.GetAllPrimarySkills(parms).Result.Items.ToList()).Returns(primarySkills.ToList());
            var primaryskillController = new PrimarySkillController(primarySkillService.Object);

            //act
            var primarySkillsResult = await primaryskillController.GetPrimarySkills(parms);

            //assert
            Assert.NotNull(primarySkillsResult);
            Assert.Equal(GetPrimarySkillsData().Count(), primarySkillsResult.Items.Count());
            Assert.Equal(GetPrimarySkillsData().ToString(), primarySkillsResult.ToString());
            Assert.True(primarySkills.Equals(primarySkillsResult));
        }

        [Fact]
        public async void GetPrimarySkillByID_PrimarySkill()
        {
            //arrange
            var primarySkillList = GetPrimarySkillsData();
            primarySkillService.Setup(x => x.GetPrimarySkillById(3)).Returns(Task.FromResult(primarySkillList[0]));
            var primaryskillController = new PrimarySkillController(primarySkillService.Object);

            //act
            var primarySkillResult = await primaryskillController.GetPrimarySkill(3) as OkObjectResult;

            //assert
            Assert.NotNull(primarySkillResult);
            var primarySkillConverted = primarySkillResult.Value as PrimarySkillModel;
            Assert.NotNull(primarySkillConverted);
            Assert.Equal(primarySkillList[0].PrimarySkillId, primarySkillConverted.PrimarySkillId);
            Assert.True(primarySkillList[0].PrimarySkillId == primarySkillConverted.PrimarySkillId);
        }

        [Theory]
        [InlineData("Java")]
        public async void CheckPrimarySkillExistOrNotByPrimarySkillName_PrimarySkill(string primarySkillName)
        {
            //arrange
            FilterPagingParameters parms = new FilterPagingParameters();
            parms.Page = 1;
            parms.PageSize = 1;
            var primarySkillList = GetPrimarySkillsData();
            primarySkillService.Setup(x => x.GetAllPrimarySkills(parms).Result.Items.ToList()).Returns(primarySkillList.ToList());
            var primarySkillController = new PrimarySkillController(primarySkillService.Object);

            //act
            var primarySkillResult = await primarySkillController.GetPrimarySkills(parms);
            var expectedPrimarySKillName = primarySkillResult.Items.ToList()[0].PrimarySkillName;

            //assert
            Assert.Equal(primarySkillName, expectedPrimarySKillName);

        }

        [Fact]
        public async void AddPrimarySkill_PrimarySkill()
        {
            //arrange
            var primaryskillList = GetPrimarySkillsData();
            primarySkillService.Setup(x => x.AddPrimarySkill(primaryskillList[0])).Returns(Task.FromResult(primaryskillList[0]));
            var primarySkillController = new PrimarySkillController(primarySkillService.Object);

            //act
            var primarySkillResult = await primarySkillController.PostPrimarySKill(primaryskillList[0]) as OkResult;

            //assert
            Assert.NotNull(primarySkillResult);            
        }

        [Fact]
        public async void UpdatePrimarySkill_PrimarySkill()
        {
            //arrange
            var primaryskillList = GetPrimarySkillsData();
            primarySkillService.Setup(x => x.UpdatePrimarySkill(primaryskillList[0])).Returns(Task.FromResult(primaryskillList[0]));
            var primarySkillController = new PrimarySkillController(primarySkillService.Object);

            //act
            var primarySkillResult = await primarySkillController.PutPrimarySkill(primaryskillList[0].PrimarySkillId, primaryskillList[0]) as OkResult;

            //assert
            Assert.NotNull(primarySkillResult);
        }

        [Fact]
        public async void DeletePrimarySkill_PrimarySkill()
        {
            //arrange
            var primaryskillList = GetPrimarySkillsData();
            primarySkillService.Setup(x => x.DeletePrimarySkill(primaryskillList[0].PrimarySkillId)).Returns(Task.FromResult(primaryskillList[0]));
            var primarySkillController = new PrimarySkillController(primarySkillService.Object);

            //act
            var primarySkillResult = await primarySkillController.DeletePrimarySkill(primaryskillList[0].PrimarySkillId) as OkResult;

            //assert
            Assert.NotNull(primarySkillResult);
        }

        private IReadOnlyList<PrimarySkillModel> GetPrimarySkillsData()
        {
            List<PrimarySkillModel> primarySkillData = new List<PrimarySkillModel>
        {
            new PrimarySkillModel
            {
                PrimarySkillId = 3,
                PrimarySkillName = "Java",
                Description = "Java",
                IsActive = true,
                CreatedBy = Guid.Parse("AE84A943-E5A5-ED11-9137-E28AE1C90464"),
                CreatedDate = DateTimeOffset.Parse("2022-11-14 17:08:33.6990000 +00:00"),
                ModifiedBy = Guid.Parse("AE84A943-E5A5-ED11-9137-E28AE1C90464"),
                ModifiedDate = DateTimeOffset.Parse("2022-11-14 17:08:33.6990000 +00:00"),
                DeletedBy = Guid.Parse("AE84A943-E5A5-ED11-9137-E28AE1C90464"),
                DeletedDate = DateTimeOffset.Parse("2022-11-14 17:08:33.6990000 +00:00")
            }
        };
            return primarySkillData;
        }
    }
}
